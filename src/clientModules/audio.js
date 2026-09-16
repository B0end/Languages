// src/clientModules/audio.js

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let currentAudio = null;
let currentButton = null;

function stopCurrent() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {}
    currentAudio = null;
  }
  if (currentButton) {
    currentButton.classList.remove('is-playing', 'is-loading');
    currentButton = null;
  }
}

function resolveAudioUrl(src) {
  if (!src) return '';
  src = src.trim();

  // Keep external / data URLs intact
  if (/^(https?:|\/\/|blob:|data:)/i.test(src)) return src;

  // Dynamically fetch baseUrl (e.g., '/Languages/' in production, '/' in dev)
  const baseUrl = (typeof window !== 'undefined' && window.docusaurusData?.baseUrl) || '/Languages/';

  const withBaseUrl = (path) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanBase}${cleanPath}`;
  };

  // Strip leading /static/ or static/
  let clean = src.replace(/^\/?static\//i, '');

  // If the path explicitly starts with an audio directory, use it directly
  if (/^audios?[-_a-zA-Z0-9]*\//i.test(clean)) {
    return withBaseUrl(clean);
  }

  // Fallback route auto-detection based on current URL path
  const currentPath = window.location.pathname;
  const fileName = clean.split('/').pop();

  if (currentPath.includes('/docs-portuguese')) {
    return withBaseUrl(`audios-PT/${fileName}`); // Adjust 'audios-PT' to match your static folder name
  } else if (currentPath.includes('/docs-russian')) {
    return withBaseUrl(`audios-RU/${fileName}`); // Adjust 'audios-RU' to match your static folder name
  }

  // Default fallback for Chinese or general files
  return withBaseUrl(`audios-CN/${fileName}`);
}

function playAudio(src, button) {
  const fullUrl = resolveAudioUrl(src);
  if (!fullUrl) return;

  if (currentButton === button && currentAudio && !currentAudio.paused) {
    stopCurrent();
    return;
  }

  stopCurrent();

  const audio = new Audio(fullUrl);
  currentAudio = audio;
  currentButton = button;

  button.classList.add('is-loading');

  audio.addEventListener('play', () => {
    button.classList.remove('is-loading');
    button.classList.add('is-playing');
  });

  audio.addEventListener('ended', stopCurrent);

  audio.addEventListener('error', (err) => {
    console.error('[Audio Error]', fullUrl, err);
    button.classList.remove('is-loading', 'is-playing');
    button.classList.add('is-error');
    setTimeout(() => button.classList.remove('is-error'), 2000);
    stopCurrent();
  });

  audio.play().catch(stopCurrent);
}

// Tone detector helper for Pinyin
function getTone(syllable) {
  if (/[āēīōūǖ1]/i.test(syllable)) return 1;
  if (/[áéíóúǘ2]/i.test(syllable)) return 2;
  if (/[ǎěǐǒǔǚ3]/i.test(syllable)) return 3;
  if (/[àèìòùǜ4]/i.test(syllable)) return 4;
  return 5; // Neutral tone
}

// Automatically splits pinyin and colors each syllable
function createColoredPinyin(pinyinText) {
  const container = document.createElement('span');
  container.className = 'vocab-pinyin';

  const syllableRegex = /([bcdfghjklmnpqrstwxyzBCDFGHJKLMNPQRSTWXYZ]*(?:zh|ch|sh|ZH|CH|SH)?[aeiouüvAEIOUÜVāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+(?:ng|n|r)?\d?)|([^a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\d]+)/gi;

  let match;
  let hasMatches = false;

  while ((match = syllableRegex.exec(pinyinText)) !== null) {
    const [, syllable, punctuation] = match;
    if (syllable) {
      hasMatches = true;
      const tone = getTone(syllable);
      const span = document.createElement('span');
      span.className = `pinyin-syllable tone-${tone}`;
      span.textContent = syllable.replace(/[1-5]/g, '');
      container.appendChild(span);
    } else if (punctuation) {
      container.appendChild(document.createTextNode(punctuation));
    }
  }

  if (!hasMatches) {
    container.textContent = pinyinText;
  }

  return container;
}

// Checks if the text contains Chinese characters (CJK Ideographs)
function hasChinese(text) {
  return /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/.test(text);
}

function createVocabButton(rawHref, rawText) {
  let primaryWord = '', secondaryText = '', meaningText = '';
  const isChinese = hasChinese(rawText);

  if (isChinese) {
    // --- CHINESE VARIATIONS ---
    if (rawText.includes(';')) {
      const parts = rawText.split(';').map((p) => p.trim());
      primaryWord = parts[0] || '';
      secondaryText = parts[1] || ''; // Pinyin
      meaningText = parts.slice(2).join('; ') || ''; // Meaning (if exists)
    } else {
      // Space-separated: [妈 mā]
      const parts = rawText.trim().split(/\s+/);
      primaryWord = parts[0] || '';
      secondaryText = parts.slice(1).join(' ') || '';
    }
  } else {
    // --- BRAZILIAN / LATIN VARIATIONS ---
    if (rawText.includes(';')) {
      const parts = rawText.split(';').map((p) => p.trim());
      if (parts.length >= 3) {
        // [Amanhã; ɐmɐˈɲɐ̃; Tomorrow] (Word; Phonetics; Meaning)
        primaryWord = parts[0] || '';
        secondaryText = parts[1] || '';
        meaningText = parts.slice(2).join('; ') || '';
      } else {
        // [Amanhã; Tomorrow] (Word; Meaning)
        primaryWord = parts[0] || '';
        meaningText = parts[1] || '';
      }
    } else {
      // [Amanhã]
      primaryWord = rawText.trim();
    }
  }

  const audioExtensions = /\.(wav|mp3|ogg|m4a|flac|aac)($|\?)/i;
  const hasAudio = Boolean(rawHref && audioExtensions.test(rawHref));

  const btn = document.createElement(hasAudio ? 'button' : 'div');
  btn.className = `vocab-btn ${isChinese ? 'is-chinese' : 'is-latin'} ${hasAudio ? 'is-clickable' : 'is-static'}`;
  if (hasAudio) btn.type = 'button';

  // 1. Primary Word (Hanzi for Chinese / Latin Word for PT)
  if (primaryWord) {
    const wordSpan = document.createElement('span');
    wordSpan.className = isChinese ? 'vocab-hanzi' : 'vocab-latin';
    wordSpan.textContent = primaryWord;
    btn.appendChild(wordSpan);
  }

  // 2. Pronunciation (Pinyin with tone colors for Chinese / Phonetic text for Latin)
  if (secondaryText) {
    if (isChinese) {
      btn.appendChild(createColoredPinyin(secondaryText));
    } else {
      const phoneticSpan = document.createElement('span');
      phoneticSpan.className = 'vocab-phonetic';
      phoneticSpan.textContent = secondaryText;
      btn.appendChild(phoneticSpan);
    }
  }

  // 3. Meaning / Translation
  if (meaningText) {
    const mnSpan = document.createElement('span');
    mnSpan.className = 'vocab-meaning';
    mnSpan.textContent = meaningText;
    btn.appendChild(mnSpan);
  }

  if (hasAudio) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      playAudio(rawHref, btn);
    });
  }

  return btn;
}

function processAudioLinks() {
  if (!ExecutionEnvironment.canUseDOM) return;

  const content = document.querySelector('.markdown') || document.body;
  if (!content) return;

  const audioExtensions = /\.(wav|mp3|ogg|m4a|flac|aac)($|\?)/i;
  const links = content.querySelectorAll('a');

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const text = link.textContent.trim();
    const isAudioExt = audioExtensions.test(href);
    const hasSemicolon = text.includes(';');

    if (isAudioExt || hasSemicolon) {
      const vocabNode = createVocabButton(href, text);
      link.parentNode.replaceChild(vocabNode, link);
    }
  });
}

export function onRouteDidUpdate() {
  if (ExecutionEnvironment.canUseDOM) {
    setTimeout(processAudioLinks, 50);
  }
}
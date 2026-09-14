import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'My Site',
  tagline: 'Welcome',
  favicon: 'img/me.png',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'B0end',
  projectName: 'website',

  onBrokenLinks: 'ignore',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'ignore',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        // Default instance (e.g., Chinese or default docs)
        docs: {
          id: 'default',
          path: 'docs-chinese',
          routeBasePath: 'docs-chinese',
          sidebarPath: './sidebarsChinese.ts',
          editUrl: 'https://github.com/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  clientModules: [
    require.resolve('./src/clientModules/audio.js')
  ],

plugins: [
  [
    '@docusaurus/plugin-content-docs',
    {
      id: 'portuguese',
      path: 'docs-portuguese',
      routeBasePath: 'docs-portuguese',
      sidebarPath: './sidebarsPortuguese.ts',
      editUrl: 'https://github.com/',
    },
  ],
  [
    require.resolve('@easyops-cn/docusaurus-search-local'),
    {
      hashed: true,
      language: ['en', 'zh'],
      indexDocs: true,
      indexBlog: false,
      docsRouteBasePath: ['/docs-chinese/vocabulary', '/docs-chinese/grammar'],
    },
  ],
],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'B0end',
      logo: {
        alt: 'Benjamin Zambelli',
        src: 'img/me.png',
      },
      items: [
        // Omit docsPluginId or set to 'default' for the default preset instance
        {
          type: 'docSidebar',
          docsPluginId: 'default',
          sidebarId: 'chineseSidebar',
          position: 'left',
          label: 'Mandarin Chinese',
        },
        // Target the secondary instance explicitly with docsPluginId
        {
          type: 'docSidebar',
          docsPluginId: 'portuguese',
          sidebarId: 'portugueseSidebar',
          position: 'left',
          label: 'Brazilian Portuguese',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/B0end',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
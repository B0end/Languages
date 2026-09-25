import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'B0end Language Books',
  tagline: 'Multi-language documentation and learning guides',
  favicon: 'img/me.png',

  future: {
    v4: true,
  },

  // GitHub Pages configuration
  url: 'https://b0end.github.io',
  baseUrl: '/Languages/',
  organizationName: 'B0end',
  projectName: 'Languages',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

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
        // Default instance (Chinese docs)
        docs: {
          id: 'default',
          path: 'docs-chinese',
          routeBasePath: 'docs-chinese',
          sidebarPath: './sidebarsChinese.ts',
          editUrl: 'https://github.com/B0end/Languages/tree/main/',
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
        editUrl: 'https://github.com/B0end/Languages/tree/main/',
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh', 'ru', 'fr'],
        indexDocs: true,
        docsRouteBasePath: ['/docs-chinese/vocabulary', '/docs-chinese/grammar'],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'russian',
        path: 'docs-russian',
        routeBasePath: 'docs-russian',
        sidebarPath: './sidebarsRussian.ts',
        editUrl: 'https://github.com/B0end/Languages/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'french',
        path: 'docs-french',
        routeBasePath: 'docs-french',
        sidebarPath: './sidebarsFrench.ts',
        editUrl: 'https://github.com/B0end/Languages/tree/main/',
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
        {
          type: 'docSidebar',
          docsPluginId: 'default',
          sidebarId: 'chineseSidebar',
          position: 'left',
          label: 'Mandarin Chinese',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'portuguese',
          sidebarId: 'portugueseSidebar',
          position: 'left',
          label: 'Brazilian Portuguese',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'russian',
          sidebarId: 'russianSidebar',
          position: 'left',
          label: 'Russian',
        },
        {
          type: 'docSidebar',
          docsPluginId: 'french',
          sidebarId: 'frenchSidebar',
          position: 'left',
          label: 'French',
        },
        {
          href: 'https://github.com/B0end/Languages',
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
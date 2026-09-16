# Language Learning Documentation & Digital Books

A structured, multi-language documentation project built with **Docusaurus**, designed to publish digital language books and learning guides. Content is written in MDX to support interactive elements, custom components, embedded audio pronunciations, and multilingual explanations (English and Spanish).

---

## 📚 Supported Languages

The workspace includes structured modules for:

* **Chinese** (`/docs-chinese`): HSK preparation, vocabulary, grammar, and foundational basics.
* **Portuguese** (`/docs-portuguese`): Essential grammar, vocabulary, and core concepts.
* **Russian** (`/docs-russian`): Alphabet, basics, phonetics, vowel reduction, noun genders, and present tense verbs.

---

## 📂 Project Structure

```text
├── docs-chinese/        # Chinese language documentation & HSK tracks
├── docs-portuguese/     # Portuguese language guides
├── docs-russian/        # Russian language documentation
├── src/                 # Custom React components, pages, and CSS
│   ├── clientModules/
│   ├── components/
│   ├── css/
│   └── pages/
├── static/              # Audio files (.wav) and static assets
├── docusaurus.config.js # Main Docusaurus configuration
├── sidebarsChinese.ts   # Custom sidebar for Chinese
├── sidebarsPortuguese.ts# Custom sidebar for Portuguese
└── sidebarsRussian.ts   # Custom sidebar for Russian

```

---

## 🛠️ Features

* **Embedded Audio**: Audio file links (`.wav`) embedded in tables and lists for real-time pronunciation reference.
* **Multilingual Explanations**: Explanations provided in both English and Spanish to aid dual-language learners.
* **Custom Navigation**: Separate sidebars per language configured via TypeScript (`sidebars*.ts`).
* **MDX Support**: Full support for React components directly inside Markdown files.

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/B0end/Languages.git
cd Languages
npm install

```

### 3. Local Development

Start the local development server:

```bash
npm run start

```

This starts a local dev server and opens a browser window. Most changes are reflected live without restarting the server.

### 4. Build

Build the static content for production deployment:

```bash
npm run build

```
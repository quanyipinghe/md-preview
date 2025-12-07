# Markdown Previewer

A sleek, high-performance, and visually rich Markdown previewer, built with a modern tech stack and designed for seamless deployment on Cloudflare Pages.

## ✨ Features

- **Real-Time Preview:** Instantly see your Markdown rendered as you select a local file.
- **Publication-Quality Typography:** Beautifully styled output, powered by `@tailwindcss/typography`.
- **Syntax Highlighting:** Elegant code blocks with syntax highlighting for a variety of languages, thanks to `highlight.js`.
- **Modern Tech Stack:** Built with React, Vite, TypeScript, and Tailwind CSS for a fast and efficient development experience.
- **Cloudflare Ready:** Optimized for easy and performant deployment on Cloudflare Pages.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation & Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/quanyipinghe/md-preview.git
    cd md-preview
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    Your application will be running at `http://localhost:5173`.

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Markdown Parsing:** [react-markdown](https://github.com/remarkjs/react-markdown)
- **Syntax Highlighting:** [highlight.js](https://highlightjs.org/)

## ☁️ Deployment

This project is optimized for deployment on [Cloudflare Pages](https://pages.cloudflare.com/).

1.  **Push your code** to a GitHub or GitLab repository.
2.  **In the Cloudflare dashboard,** go to **Workers & Pages** and select **Create application**.
3.  **Connect your Git provider** and select your project repository.
4.  **Configure the build settings** (Cloudflare will likely auto-detect these):
    - **Framework preset:** `Vite`
    - **Build command:** `npm run build`
    - **Build output directory:** `dist`
5.  **Click "Save and Deploy".** Cloudflare will handle the rest!

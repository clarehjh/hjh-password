import { defineConfig } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  theme: {
    fontSize: {
      base: '14px', // Set the base font size to 14px
    },
  },
  rules: [
    // Custom rule to set font size by class name
    [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
  ],
  // Define shortcuts or global styles
  preflights: [
    {
      getCSS: () => `
        html {
          font-size: 14px;
        }
        body {
          font-size: 1rem; /* 1rem will now equal 14px */
        }
        p, div, span, h1, h2, h3, h4, h5, h6, a, li, dt, dd, blockquote, code, pre, table, th, td {
          font-size: inherit; /* Inherit font size from body */
        }
      `,
    },
  ],
});

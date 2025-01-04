import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "inline-css-js",
      apply: "build",
      generateBundle(_options, bundle) {
        let cssContent = "";
        let jsContent = "";

        for (const [fileName, file] of Object.entries(bundle)) {
          if (fileName.endsWith(".css") && file.type === "asset") {
            cssContent += file.source;
          }
          if (fileName.endsWith(".js") && file.type === "chunk") {
            jsContent += file.code;
          }
        }

        this.emitFile({
          type: "asset",
          fileName: "index.html",
          source: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Vite + React + TS</title>
                <style>${cssContent}</style>
              </head>
              <body>
                <div id="root"></div>
                <script>${jsContent}</script>
              </body>
            </html>
          `,
        });
      },
    },
  ],
});

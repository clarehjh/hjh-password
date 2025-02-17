import * as path from "path";
import { defineConfig } from "vite";
import { isVue2 } from "vue-demi";
import UnoCSS from "unocss/vite";

const outputName = "index";
export const defaultPlugins = [UnoCSS()];

// https://vitejs.dev/config/
export const baseBuildConfig = defineConfig({
  build: {
    target: "es2015",
    outDir: path.resolve(__dirname, `./dist/${isVue2 ? "v2" : "v3"}`),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index"),
      formats: ["es", "cjs", "umd"],
      name: "index",
      fileName: (format) => `${outputName}.${format}.js`,
    },
    rollupOptions: {
      external: [
        "vue",
        "@vue/composition-api/dist/vue-composition-api.mjs",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "@vue/composition-api/dist/vue-composition-api.mjs":
            "VueCompositionAPI",
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["vue-demi", "vue", "vue2"],
  },
});

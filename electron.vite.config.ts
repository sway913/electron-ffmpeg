import { resolve } from "path"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import react from "@vitejs/plugin-react"
import reactCssModule from "vite-react-stylename"
import genericNames from "generic-names"
import autoprefixer from "autoprefixer"

const generateScopedName = genericNames("[name]__[local]__[hash:base64:4]")

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@resources": resolve("resources"),
        "@constants": resolve("src/constants"),
        "@common": resolve("src/common"),
        "@utils": resolve("src/utils"),
        "@interfaces": resolve("src/interfaces"),
        "@main": resolve("src/main"),
        "@preload": resolve("src/preload"),
      },
    },
    build: {
      minify: "esbuild",
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      minify: "esbuild",
    },
    resolve: {
      alias: {
        "@constants": resolve("src/constants"),
        "@common": resolve("src/common"),
        "@utils": resolve("src/utils"),
      },
    },
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer"),
        "@interfaces": resolve("src/interfaces"),
        "@siteMain": resolve("src/renderer/siteMain/src"),
        "~": resolve("src"),
      },
    },
    plugins: [
      reactCssModule({
        generateScopedName,
        filetypes: {
          ".less": {
            syntax: "postcss-less",
          },
        },
      }),
      react(),
    ],
    css: {
      modules: {
        generateScopedName: generateScopedName,
      },
      postcss: {
        plugins: [autoprefixer],
      },
      preprocessorOptions: {
        less: {
          additionalData: `@import '@renderer/assets/styles/theme.less';`,
          javascriptEnabled: true,
        },
      },
    },
    build: {
      minify: "esbuild",
      cssMinify: "esbuild",
      rollupOptions: {
        input: {
          siteMain: resolve(__dirname, "src/renderer/siteMain/index.html"),
        },
        output: {
          manualChunks: {
            reactBase: ["react", "react-dom"],
            reactEcology: ["react-router-dom", "mobx", "mobx-react"],
            tools: ["ahooks", "lodash", "nanoid"],
            // antd: ["antd"],
          },
        },
      },
    },
  },
})

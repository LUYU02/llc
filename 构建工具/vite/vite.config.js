import { defineConfig } from "vite"
// 引入兼容性的插件
import legacy from "@vitejs/plugin-legacy"
export default defineConfig({
  //   defineConfig 要提示就写
  plugins: [
    legacy({
      targets: ["defaults", "IE 11"],
    }),
  ],
})

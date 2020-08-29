import progress from "rollup-plugin-progress";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bot.js",
    format: "cjs",
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [progress(), json(), typescript()],
};

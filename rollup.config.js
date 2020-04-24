import progress from "rollup-plugin-progress";
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'cjs'
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
    ],
    plugins: [
        progress(),
        json(),
        typescript({ module: 'CommonJS' }),
        nodeResolve(),
        commonjs({ extensions: ['.js', '.ts'] })
    ]
}

import { Module } from "./Module";

export class ModuleLoader {
    constructor(private modules: Module[]) {
    }

    enableAllModules() {
        this.modules.forEach((module) => {
            module.onEnable();
        });
    }
}

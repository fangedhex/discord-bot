import { injectable, multiInject } from "inversify";
import { Module } from "./Module";

@injectable()
export class ModuleLoader {
    constructor(@multiInject("Modules") private modules: Module[]) {
    }

    enableAllModules() {
        this.modules.forEach((module) => {
            module.onEnable();
        });
    }

    disableAllModules() {
        this.modules.forEach((module) => {
            module.onDisable();
        });
    }
}

import { ModuleLoader } from "../../src/core/ModuleLoader";
import { mock } from "jest-mock-extended";
import { Module } from "../../src/core/Module";

describe(ModuleLoader, () => {
  const module = mock<Module>();
  const moduleLoader = new ModuleLoader([module]);

  it("enables our module", () => {
    moduleLoader.enableAllModules();
    expect(module.onEnable).toHaveBeenCalled();
  });
});

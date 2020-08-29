import { mock } from "jest-mock-extended";
import { Logger, TextBasedChannel } from "../../../src/bridge/discord/Logger";

describe("Logger", () => {
  const channel = mock<TextBasedChannel>();
  const logger = new Logger(channel);

  it("should send an info", () => {
    logger.info("info");

    expect(channel.send).toHaveBeenCalledWith(":information_source: info");
  });

  it("should send a success", () => {
    logger.success("success");

    expect(channel.send).toHaveBeenCalledWith(":white_check_mark: success");
  });

  it("should send an error", () => {
    logger.error("error");

    expect(channel.send).toHaveBeenCalledWith(":x: error");
  });
});

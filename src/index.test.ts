import { describe, it, expect } from "vitest";
import { createTranslator } from "./index.js";

describe("createTranslator", () => {
  it("creates a translator function", async () => {
    const translator = await createTranslator({
      getRandom: () => 0.5,
      getProbability: () => 1,
    });
    expect(translator).toBeTypeOf("function");
    expect(translator("hello")).toBe("caramello");
  });

  it("matches case", async () => {
    const translator = await createTranslator({
      getRandom: () => 0.5,
      getProbability: () => 1,
    });
    expect(translator("Hello, world!")).toBe("Caramello, chocoworld!");
    expect(translator("Well, I did not expect THAT.")).toBe(
      "Chewell, I did nut snaxpect THAT."
    );
  });
});

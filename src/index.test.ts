import { describe, it, expect } from "vitest";
import { createTranslator } from "./index.js";

describe("createTranslator", () => {
  it("creates a translator function", async () => {
    const translator = await createTranslator({ getProbability: () => 1 });
    expect(translator).toBeTypeOf("function");
    expect(translator("hello")).toBe("caramello");
  });
});

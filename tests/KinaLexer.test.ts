import { describe, expect, it } from "vitest";
import { KinaLexer } from "../src";
import { readFile } from "fs/promises";

describe("Lexer", () => {
  const lexer = new KinaLexer({
    fileName: "test.kin",
    rootDir: "/virtual/kina/test/",
  });

  it("should tokenize single characters correctly", async () => {
    const input = await readFile(
      "./tests/assets/singleCharacters.kin",
      "utf-8",
    );
    const wantedOutput = JSON.parse(
      await readFile("./tests/assets/singleCharacters.kin.json", "utf-8"),
    );

    const tokens = lexer.tokenize(input);

    expect(tokens).toBeDefined();
    expect(Array.isArray(tokens)).toBe(true);
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.map((t) => t.export())).toEqual(wantedOutput);
  });

  it("should tokenize keywords correctly", async () => {
    const input = await readFile("./tests/assets/keywords.kin", "utf-8");
    const wantedOutput = JSON.parse(
      await readFile("./tests/assets/keywords.kin.json", "utf-8"),
    );

    const tokens = lexer.tokenize(input);

    expect(tokens).toBeDefined();
    expect(Array.isArray(tokens)).toBe(true);
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.map((t) => t.export())).toEqual(wantedOutput);
  });

  it("should tokenize comments correctly", async () => {
    const input = await readFile("./tests/assets/comments.kin", "utf-8");
    const wantedOutput = JSON.parse(
      await readFile("./tests/assets/comments.kin.json", "utf-8"),
    );

    const tokens = lexer.tokenize(input);

    expect(tokens).toBeDefined();
    expect(Array.isArray(tokens)).toBe(true);
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.map((t) => t.export())).toEqual(wantedOutput);
  });
});

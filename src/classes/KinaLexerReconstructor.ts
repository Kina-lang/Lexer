import type { BaseToken } from "./tokens/_base";

export class KinaLexerReconstructor {
  constructor() {}

  public reconstruct(tokens: BaseToken[]): string {
    let reconstructedCode = "";

    for (const token of tokens) {
      reconstructedCode += token.reconstruct();
    }

    return reconstructedCode;
  }
}

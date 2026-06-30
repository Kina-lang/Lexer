import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { BaseTokenizer } from "./_base";

export class IdentifierTokenizer extends BaseTokenizer {
  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    return true; // this is fallback -> everything that was not tokenized by other tokenizers is an identifier
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    // TODO: Implement
    characterStream.advance(); // Just consume current character for now to avoid infinite loop in lexer
    return [];
  }
}

import { KinaAssertionError } from "@kina-lang/utils";
import type { ILexerConfig } from "../types/LexerConfig";
import { CharacterStream } from "./CharacterStream";
import { IdentifierTokenizer } from "./tokenizers";
import type { BaseTokenizer } from "./tokenizers/_base";
import { SingleCharacterTokenizer } from "./tokenizers/SingleCharacterTokenizer";
import type { BaseToken } from "./tokens/_base";
import { KeywordTokenizer } from "./tokenizers/KeywordTokenizer";

export class KinaLexer {
  private readonly _opts: ILexerConfig;

  /**
   * Array of all tokenizers that will be used to tokenize the input.
   * Must be ordered in order of priority, with the highest priority tokenizer first.
   */
  private readonly _tokenizers: BaseTokenizer[] = [
    new KeywordTokenizer(),
    new SingleCharacterTokenizer(), // Must have second lowest priority
    new IdentifierTokenizer(), // Must have lowest priority
  ] as const;

  constructor(opts: ILexerConfig) {
    this._opts = opts;
  }

  /**
   * Takes the file contents and returns an array of tokens.
   * @param input kina file contents
   */
  public tokenize(input: string): BaseToken[] {
    const characterStream = new CharacterStream(input);
    const tokens: BaseToken[] = [];

    // Loop until end of stream is reached
    while (!characterStream.isAtEnd) {
      // Process the current character with tokenizers
      const newTokens = this.processCurrent(characterStream);
      tokens.push(...newTokens);
    }

    return tokens;
  }

  private processCurrent(characterStream: CharacterStream): BaseToken[] {
    // For each of our defined tokenizers (in order of priority), attempt to tokenize the current character
    for (const tokenizer of this._tokenizers) {
      // Let the tokenizer look at our character stream and see if it can tokenize the current character
      if (!tokenizer.canTokenize(characterStream)) continue;

      // If it can, let it tokenize the current character and return the resulting tokens
      return tokenizer.tokenize(characterStream);
    }

    // If no tokenizer could tokenize the current character, throw an error
    throw new KinaAssertionError(
      `No tokenizer could tokenize the current character at position ${characterStream.currentPosition}.`,
    );
  }
}

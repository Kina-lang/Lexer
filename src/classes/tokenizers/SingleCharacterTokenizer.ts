import { KinaAssertionError } from "@kina-lang/utils";
import { TokenKind, type TokenSpan } from "../../types/Token";
import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { Tokens } from "../tokens/_index";
import { BaseTokenizer } from "./_base";

export class SingleCharacterTokenizer extends BaseTokenizer {
  protected readonly characters: Map<
    string,
    new (span: TokenSpan) => BaseToken
  > = new Map([
    ["(", Tokens.ParentheseOpen],
    [")", Tokens.ParentheseClose],
    ["[", Tokens.BracketOpen],
    ["]", Tokens.BracketClose],
    ["{", Tokens.BraceOpen],
    ["}", Tokens.BraceClose],
    [":", Tokens.Colon],
    [";", Tokens.Semicolon],
    [",", Tokens.Comma],
    [".", Tokens.Dot],
    ["=", Tokens.OperatorAssign],
  ]);

  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    const currentCharacter = characterStream.peek();
    if (currentCharacter === null) return false;

    return this.characters.has(currentCharacter);
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;
    const currentCharacter = characterStream.advance();
    if (currentCharacter === null)
      throw new KinaAssertionError("Current character is null!");

    const TokenClass = this.characters.get(currentCharacter);
    if (!TokenClass)
      throw new KinaAssertionError(
        `No token class found for character: ${currentCharacter}`,
      );

    const endLocation = characterStream.currentLocation;

    return [new TokenClass({ start: startLocation, end: endLocation })];
  }
}

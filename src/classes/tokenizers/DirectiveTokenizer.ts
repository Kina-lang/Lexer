import { KinaAssertionError } from "@kina-lang/utils";
import type { TokenSpan } from "../../types/Token";
import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { Tokens } from "../tokens/_index";
import { BaseTokenizer } from "./_base";

export class DirectiveTokenizer extends BaseTokenizer {
  protected readonly directives: Map<
    string,
    new (span: TokenSpan) => BaseToken
  > = new Map([["include", Tokens.DirectiveInclude]]);

  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    const currentCharacter = characterStream.peek();
    if (currentCharacter === null) return false;
    if (currentCharacter !== "@") return false;

    // Get the string according to the predicate function
    const str = characterStream.peekUntil(
      characterStream,
      this.predicate.bind(this),
      1
    );
    if (str === "") return false;

    // Check if the string is a directive
    if (this.directives.has(str)) return true;

    return false;
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    characterStream.advance(); // Consume the "@" character

    const str = characterStream.advanceUntil(
      characterStream,
      this.predicate.bind(this),
    );
    if (str === "") throw new KinaAssertionError("No string to tokenize!");

    const endLocation = characterStream.currentLocation;

    const TokenClass = this.directives.get(str);
    if (!TokenClass)
      throw new KinaAssertionError(
        `No token class found for directive: ${str}`,
      );

    return [new TokenClass({ start: startLocation, end: endLocation })];
  }

  private predicate(character: string): boolean {
    // Check if the character is a letter (a-z or A-Z) or an "@" symbol
    return /[a-zA-Z\@]/.test(character);
  }
}

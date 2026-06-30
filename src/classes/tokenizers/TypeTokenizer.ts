import { KinaAssertionError } from "@kina-lang/utils";
import type { TokenSpan } from "../../types/Token";
import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { Tokens } from "../tokens/_index";
import { BaseTokenizer } from "./_base";

export class TypeTokenizer extends BaseTokenizer {
  protected readonly types: Map<string, new (span: TokenSpan) => BaseToken> =
    new Map([
      ["void", Tokens.TypeVoid],
      ["int", Tokens.TypeInt],
      ["bool", Tokens.TypeBool],
    ]);

  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    // Get the string according to the predicate function
    const str = characterStream.peekUntil(
      characterStream,
      this.predicate.bind(this),
    );
    if (str === "") return false;

    // Check if the string is a type
    if (this.types.has(str)) return true;

    return false;
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    const str = characterStream.advanceUntil(
      characterStream,
      this.predicate.bind(this),
    );
    if (str === "") throw new KinaAssertionError("No string to tokenize!");

    const endLocation = characterStream.currentLocation;

    const TokenClass = this.types.get(str);
    if (!TokenClass)
      throw new KinaAssertionError(`No token class found for type: ${str}`);

    return [new TokenClass({ start: startLocation, end: endLocation })];
  }

  private predicate(character: string): boolean {
    // Check if the character is a letter (a-z or A-Z) or a digit (0-9)
    return /[a-zA-Z0-9]/.test(character);
  }
}

import { KinaAssertionError } from "@kina-lang/utils";
import { isDigit } from "../../utils/chars";
import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { BaseTokenizer } from "./_base";
import { Tokens } from "../tokens/_index";

export class IdentifierTokenizer extends BaseTokenizer {
  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    const currentChar = characterStream.peek();
    if (currentChar === null) return false;
    if (isDigit(currentChar)) return false; // Identifiers cannot start with a digit

    const str = characterStream.peekUntil(characterStream, this.predicate);
    if (str === "") return false; // No valid identifier characters found

    return true;
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    const identifier = characterStream.advanceUntil(
      characterStream,
      this.predicate,
    );
    if (identifier === "")
      throw new KinaAssertionError("No valid identifier characters found!");

    const endLocation = characterStream.currentLocation;

    return [
      new Tokens.Identifier(
        {
          start: startLocation,
          end: endLocation,
        },
        identifier,
      ),
    ];
  }

  private predicate(char: string): boolean {
    return /[a-zA-Z0-9_]/.test(char);
  }
}

import { isWhitespace } from "../../utils/chars";
import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { WhitespaceToken } from "../tokens/Whitespace";
import { BaseTokenizer } from "./_base";

export class WhitespaceTokenizer extends BaseTokenizer {
  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    const currentChar = characterStream.peek();
    if (currentChar === null) return false;

    return isWhitespace(currentChar);
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    const val = characterStream.advanceUntil(characterStream, (char) =>
      isWhitespace(char),
    );

    const endLocation = characterStream.currentLocation;

    return [
      new WhitespaceToken({ start: startLocation, end: endLocation }, val),
    ];
  }
}

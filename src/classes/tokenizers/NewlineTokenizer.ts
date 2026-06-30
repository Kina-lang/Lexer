import { isEndOfLine } from "../../utils/chars";
import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { NewlineToken } from "../tokens/Newline";
import { BaseTokenizer } from "./_base";

export class NewlineTokenizer extends BaseTokenizer {
  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    const currentChar = characterStream.peek();
    if (currentChar === null) return false;

    return isEndOfLine(currentChar);
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;
    const currentChar = characterStream.advance();
    if (currentChar === null) throw new Error("Current character is null!");

    const endLocation = characterStream.currentLocation;

    return [new NewlineToken({ start: startLocation, end: endLocation })];
  }
}

import { KinaAssertionError } from "@kina-lang/utils";
import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { BaseTokenizer } from "./_base";
import { isEndOfLine } from "../../utils/chars";
import { CommentToken } from "../tokens/Comment";

export class CommentTokenizer extends BaseTokenizer {
  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    const currentChar = characterStream.peek();
    const nextChar = characterStream.peekAhead(1);
    if (currentChar == null || nextChar == null) return false;

    // Match any // or /*
    return currentChar == "/" && (nextChar == "/" || nextChar == "*");
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    const currentChar = characterStream.peek();
    const nextChar = characterStream.peekAhead(1);
    if (currentChar === null || nextChar === null)
      throw new KinaAssertionError(
        "Unexpected end of input while tokenizing comment.",
      );
    if (currentChar != "/" || (nextChar != "/" && nextChar != "*"))
      throw new KinaAssertionError("Invalid comment start sequence.");

    if (nextChar == "/") return this.tokenizeSingleLineComment(characterStream);
    if (nextChar == "*") return this.tokenizeMultiLineComment(characterStream);

    throw new KinaAssertionError("Invalid comment start sequence.");
  }

  private tokenizeSingleLineComment(
    characterStream: CharacterStream,
  ): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    // Consume the "//" characters
    characterStream.advance();
    characterStream.advance();

    // Consume characters until the end of the line or end of stream
    const line = characterStream.advanceUntil(
      characterStream,
      (char) => !isEndOfLine(char),
    );

    const endLocation = characterStream.currentLocation;

    return [
      new CommentToken(
        {
          start: startLocation,
          end: endLocation,
        },
        `//${line}`,
      ),
    ];
  }

  private tokenizeMultiLineComment(
    characterStream: CharacterStream,
  ): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    // Consume the "/*" characters
    characterStream.advance();
    characterStream.advance();

    // Consume characters until the closing "*/" or end of stream
    const line = characterStream.advanceUntil(characterStream, (char) => {
      const nextChar = characterStream.peekAhead(1);

      return !(char === "*" && nextChar === "/");
    });

    // Consume the closing "*/" characters
    characterStream.advance();
    characterStream.advance();

    const endLocation = characterStream.currentLocation;

    return [
      new CommentToken(
        {
          start: startLocation,
          end: endLocation,
        },
        `/*${line}*/`,
      ),
    ];
  }
}

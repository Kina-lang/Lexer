import { KinaAssertionError } from "@kina-lang/utils";
import { isEndOfLine } from "../../utils/chars";
import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";
import { BaseTokenizer } from "./_base";
import { Tokens } from "../tokens/_index";

export class LiteralTokenizer extends BaseTokenizer {
  constructor() {
    super();
  }

  override canTokenize(characterStream: CharacterStream): boolean {
    return (
      this.isTokenizableBoolean(characterStream) ||
      this.isTokenizableFloat(characterStream) ||
      this.isTokenizableInteger(characterStream) ||
      this.isTokenizableString(characterStream)
    );
  }

  override tokenize(characterStream: CharacterStream): BaseToken[] {
    if (this.isTokenizableBoolean(characterStream))
      return this.tokenizeBoolean(characterStream);
    // float MUST be before integer !!
    if (this.isTokenizableFloat(characterStream))
      return this.tokenizeFloat(characterStream);
    if (this.isTokenizableInteger(characterStream))
      return this.tokenizeInteger(characterStream);
    if (this.isTokenizableString(characterStream))
      return this.tokenizeString(characterStream);

    throw new KinaAssertionError("No tokenizable literal found!");
  }

  private tokenizeBoolean(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    const str = characterStream.advanceUntil(
      characterStream,
      this.booleanPredicate.bind(this),
    );
    if (str == "") throw new KinaAssertionError("Invalid string");
    if (str !== "true" && str !== "false")
      throw new KinaAssertionError(`Invalid boolean literal: ${str}`);

    const endLocation = characterStream.currentLocation;

    return [
      new Tokens.LiteralBoolean(
        { start: startLocation, end: endLocation },
        str,
      ),
    ];
  }

  private tokenizeInteger(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    const str = characterStream.advanceUntil(
      characterStream,
      this.integerPredicate.bind(this),
    );
    if (str == "") throw new KinaAssertionError("Invalid string");
    if (!/^[0-9]+$/.test(str))
      throw new KinaAssertionError(`Invalid integer literal: ${str}`);

    const endLocation = characterStream.currentLocation;

    return [
      new Tokens.LiteralInteger(
        { start: startLocation, end: endLocation },
        str,
      ),
    ];
  }

  private tokenizeFloat(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    const str = characterStream.advanceUntil(
      characterStream,
      this.floatPredicate.bind(this),
    );
    if (str == "") throw new KinaAssertionError("Invalid string");
    if (!/^[0-9]+\.[0-9]+$/.test(str))
      throw new KinaAssertionError(`Invalid float literal: ${str}`);

    const endLocation = characterStream.currentLocation;

    return [
      new Tokens.LiteralFloat({ start: startLocation, end: endLocation }, str),
    ];
  }

  private tokenizeString(characterStream: CharacterStream): BaseToken[] {
    const startLocation = characterStream.currentLocation;

    const initialChar = characterStream.advance();
    if (initialChar === null)
      throw new KinaAssertionError("Initial character is null!");
    if (initialChar !== '"' && initialChar !== "'")
      throw new KinaAssertionError(
        `Invalid initial character for string literal: ${initialChar}`,
      );

    const str = characterStream.advanceUntil(
      characterStream,
      this.stringPredicate(initialChar).bind(this),
    );
    if (str == "") throw new KinaAssertionError("Invalid string");

    const closingChar = characterStream.advance();
    if (closingChar === null)
      throw new KinaAssertionError("Closing character is null!");
    if (closingChar !== initialChar)
      throw new KinaAssertionError(
        `Invalid closing character for string literal: ${closingChar}`,
      );

    const endLocation = characterStream.currentLocation;

    return [
      new Tokens.LiteralString(
        { start: startLocation, end: endLocation },
        `${initialChar}${str}${closingChar}`,
      ),
    ];
  }

  private isTokenizableBoolean(characterStream: CharacterStream): boolean {
    const str = characterStream.peekUntil(
      characterStream,
      this.booleanPredicate.bind(this),
    );
    if (str === "") return false;

    // Check if the string is a boolean literal
    if (str === "true" || str === "false") return true;

    return false;
  }

  private isTokenizableInteger(characterStream: CharacterStream): boolean {
    const str = characterStream.peekUntil(
      characterStream,
      this.integerPredicate.bind(this),
    );
    if (str === "") return false;

    // Check if the string is an integer literal
    if (/^[0-9]+$/.test(str)) return true;

    return false;
  }

  private isTokenizableFloat(characterStream: CharacterStream): boolean {
    const str = characterStream.peekUntil(
      characterStream,
      this.floatPredicate.bind(this),
    );
    if (str === "") return false;

    // Check if the string is a float literal
    if (/^[0-9]+\.[0-9]+$/.test(str)) return true;

    return false;
  }

  private isTokenizableString(characterStream: CharacterStream): boolean {
    const current = characterStream.peek();
    if (current === null) return false;
    if (current !== '"' && current !== "'") return false;

    const str = characterStream.peekUntil(
      characterStream,
      this.stringPredicate(current).bind(this),
      1,
    );
    if (str === "") return false;

    return true;
  }

  private booleanPredicate(character: string): boolean {
    // Check if the character is a letter from "truefals"
    // Not checking the whole alphabet to speed up the process, since we only care about the letters that make up "true" and "false"
    return /[truefals]/.test(character);
  }

  private integerPredicate(character: string): boolean {
    // Check if the character is a digit (0-9)
    return /[0-9]/.test(character);
  }

  private floatPredicate(character: string): boolean {
    // Check if the character is a digit (0-9) or a dot (.)
    return /[0-9.]/.test(character);
  }

  private stringPredicate(initialChar: string) {
    return (
      character: string,
      currentOffset: number,
      characterStream: CharacterStream,
    ): boolean => {
      const previousCharacter = characterStream.peekAhead(currentOffset - 1);

      // Check if end of line
      if (isEndOfLine(character)) return false;

      // Check if the character is the same as the initial character and not escaped
      if (character === initialChar && previousCharacter !== "\\") return false;

      return true;
    };
  }
}

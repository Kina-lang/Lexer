export class CharacterStream {
  private _characters: string[];
  private _currentPosition: number;
  private _line: number;
  private _column: number;

  constructor(input: string) {
    this._characters = input.split("");
    this._currentPosition = 0;
    this._line = 1;
    this._column = 1;
  }

  /**
   * Returns the next character in the stream without advancing the position.
   * @returns The next character in the stream, or null if the end of the stream has been reached.
   */
  public peek(): string | null {
    if (this._currentPosition >= this._characters.length) return null;

    return this._characters[this._currentPosition]!;
  }

  /**
   * Returns the current character in the stream and advances the position.
   * @returns The current character in the stream, or null if the end of the stream has been reached.
   */
  public advance(): string | null {
    if (this._currentPosition >= this._characters.length) return null;

    const char = this._characters[this._currentPosition]!;
    this._currentPosition++;
    this._column++;

    if (char === "\n") {
      this._line++;
      this._column = 1;
    }

    return char;
  }

  /**
   * Returns the current position in the character stream.
   * @returns The current position in the character stream.
   */
  public get currentPosition(): number {
    return this._currentPosition;
  }

  /**
   * Returns the current line number in the character stream.
   * @returns The current line number in the character stream.
   */
  public get currentLine(): number {
    return this._line;
  }

  /**
   * Returns the current column number in the character stream.
   * @returns The current column number in the character stream.
   */
  public get currentColumn(): number {
    return this._column;
  }

  /**
   * Returns the current location in the character stream as an object containing the line and column numbers.
   * @returns An object containing the current line and column numbers in the character stream.
   */
  public get currentLocation(): { line: number; column: number } {
    return { line: this._line, column: this._column };
  }

  /**
   * Returns true if the end of the character stream has been reached, false otherwise.
   * @returns True if the end of the character stream has been reached, false otherwise.
   */
  public get isAtEnd(): boolean {
    return this._currentPosition >= this._characters.length;
  }

  /**
   * Returns the character at the specified position ahead of the current position in the character stream without advancing the position.
   * @param n The number of characters ahead of the current position to peek.
   * @returns The character at the specified position ahead of the current position in the character stream, or null if the end of the stream has been reached.
   */
  public peekAhead(n: number): string | null {
    const peekPosition = this._currentPosition + n;
    if (peekPosition >= this._characters.length) return null;

    return this._characters[peekPosition]!;
  }

  /**
   * Returns a string containing all characters from the current position in the character stream until the predicate function returns false.
   * @param characterStream
   * @param predicate A function that takes a character as input and returns true if the character should be included in the result string, false otherwise.
   * @returns A string containing all characters from the current position in the character stream until the predicate function returns false.
   */
  public peekUntil(
    characterStream: CharacterStream,
    predicate: (char: string) => boolean,
    initialOffset: number = 0,
  ): string {
    let result: string = "";
    let offset: number = initialOffset;
    let currentCharacter: string | null = characterStream.peekAhead(offset);

    while (currentCharacter && predicate(currentCharacter)) {
      result += currentCharacter;
      offset++;

      currentCharacter = characterStream.peekAhead(offset);
    }

    return result;
  }

  /**
   * Advances the character stream until the predicate function returns false, returning a string containing all characters that were advanced over.
   * @param characterStream
   * @param predicate A function that takes a character as input and returns true if the character should be included in the result string, false otherwise.
   * @returns A string containing all characters that were advanced over until the predicate function returned false.
   */
  public advanceUntil(
    characterStream: CharacterStream,
    predicate: (char: string) => boolean,
  ): string {
    let result: string = "";
    let currentCharacter: string | null = characterStream.peek();

    while (currentCharacter && predicate(currentCharacter)) {
      result += currentCharacter;
      characterStream.advance();

      currentCharacter = characterStream.peek();
    }

    return result;
  }
}

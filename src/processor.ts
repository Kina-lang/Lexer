import { KinaLogger } from "@kina-lang/utils";
import {
  EKinaLexerTokenKind,
  type IKinaLexerTokenDefinition,
} from "./types/token";

export class KinaLexerProcessor {
  private readonly logger: KinaLogger = new KinaLogger(KinaLexerProcessor.name);

  private static TOKEN_SINGLE_CHAR_MAP = {
    "(": EKinaLexerTokenKind.ParentheseOpen,
    ")": EKinaLexerTokenKind.ParentheseClose,
    "[": EKinaLexerTokenKind.BracketOpen,
    "]": EKinaLexerTokenKind.BracketClose,
    "{": EKinaLexerTokenKind.BraceOpen,
    "}": EKinaLexerTokenKind.BraceClose,
    ":": EKinaLexerTokenKind.Colon,
    ";": EKinaLexerTokenKind.Semicolon,
    ",": EKinaLexerTokenKind.Comma,
    ".": EKinaLexerTokenKind.Dot,
  };
  private static TOKEN_SINGLE_CHAR = Object.keys(
    this.TOKEN_SINGLE_CHAR_MAP,
  ) as (keyof typeof this.TOKEN_SINGLE_CHAR_MAP)[];
  private static TOKEN_KEYWORD_MAP = {
    func: EKinaLexerTokenKind.KeywordFunction,
    return: EKinaLexerTokenKind.KeywordReturn,
    extern: EKinaLexerTokenKind.KeywordExtern,
  };
  private static TOKEN_KEYWORD = Object.keys(
    this.TOKEN_KEYWORD_MAP,
  ) as (keyof typeof this.TOKEN_KEYWORD_MAP)[];
  private static TOKEN_DIRECTIVE_MAP = {
    "@include": EKinaLexerTokenKind.DirectiveInclude,
  };
  private static TOKEN_DIRECTIVE = Object.keys(
    this.TOKEN_DIRECTIVE_MAP,
  ) as (keyof typeof this.TOKEN_DIRECTIVE_MAP)[];
  private static TOKEN_TYPE_MAP = {
    int32: EKinaLexerTokenKind.TypeInt32,
    bool: EKinaLexerTokenKind.TypeBool,
    string: EKinaLexerTokenKind.TypeString,
  };
  private static TOKEN_TYPE = Object.keys(
    this.TOKEN_TYPE_MAP,
  ) as (keyof typeof this.TOKEN_TYPE_MAP)[];

  private cursorPosition: number = 0;
  private currentLine: number = 0;
  private currentCol: number = 0;
  private tokens: IKinaLexerTokenDefinition[] = [];

  public async process(fileName: string, chars: string) {
    while (this.cursorPosition < chars.length) {
      const char = chars[this.cursorPosition]!;

      if (this.isSingleCharToken(char)) this.parseSingleCharToken(char);
      else if (this.isNewline(char)) this.parseNewline(char);
      else if (this.isBoolean(chars, char)) this.parseBoolean(chars, char);
      else if (this.isNumber(char)) this.parseNumber(chars, char);
      else if (this.isString(char)) this.parseString(chars, char);
      else if (this.isDirective(chars, char)) this.parseDirective(chars, char);
      else if (this.isKeyword(chars, char)) this.parseKeyword(chars, char);
      else if (this.isType(chars, char)) this.parseType(chars, char);
      else if (this.isWhitespace(char)) {
        // no-op
      }
      // MUST come last, before else
      else if (this.isIdentifier(char, true)) this.parseIdentifier(chars, char);
      else
        this.logger.error(
          `Invalid character "${char}" at ${fileName}:${this.currentLine + 1}:${this.currentCol + 1}!`,
        );

      this.cursorPosition++;
      this.currentCol++;
    }

    this.tokens.push({
      kind: EKinaLexerTokenKind.EOF,
      value: "",
      len: 0,
      col: this.currentCol,
      line: this.currentLine,
    });

    return this.tokens;
  }

  private isSingleCharToken(char: string) {
    if (
      KinaLexerProcessor.TOKEN_SINGLE_CHAR.includes(
        char as (typeof KinaLexerProcessor.TOKEN_SINGLE_CHAR)[number],
      )
    )
      return true;
    return false;
  }

  private isNewline(char: string) {
    if (char === "\n") return true;
    return false;
  }

  private isWhitespace(char: string) {
    if (char === " " || char === "\t" || char === "\r") return true;
    return false;
  }

  private isNumber(char: string) {
    if (/\d/.test(char)) return true;
    return false;
  }

  private isString(char: string) {
    if (char === '"' || char === "'") return true;
    return false;
  }

  private isTrueBoolean(chars: string, char: string) {
    // TODO: Prevent OutOfRange
    if (
      char === "t" &&
      chars[this.cursorPosition + 1] === "r" &&
      chars[this.cursorPosition + 2] === "u" &&
      chars[this.cursorPosition + 3] === "e" &&
      (this.isSingleCharToken(chars[this.cursorPosition + 4]!) ||
        this.isWhitespace(chars[this.cursorPosition + 4]!) ||
        this.isNewline(chars[this.cursorPosition + 4]!))
    )
      return true;
    return false;
  }

  private isFalseBoolean(chars: string, char: string) {
    // TODO: Prevent OutOfRange
    if (
      char === "f" &&
      chars[this.cursorPosition + 1] === "a" &&
      chars[this.cursorPosition + 2] === "l" &&
      chars[this.cursorPosition + 3] === "s" &&
      chars[this.cursorPosition + 4] === "e" &&
      (this.isSingleCharToken(chars[this.cursorPosition + 5]!) ||
        this.isWhitespace(chars[this.cursorPosition + 5]!) ||
        this.isNewline(chars[this.cursorPosition + 5]!))
    )
      return true;
    return false;
  }

  private isBoolean(chars: string, char: string) {
    return this.isTrueBoolean(chars, char) || this.isFalseBoolean(chars, char);
  }

  private isKeyword(chars: string, char: string) {
    let buf = "";
    let currentChar = char;

    for (let i = this.cursorPosition; i < chars.length; i++) {
      currentChar = chars[i]!;

      if (
        this.isSingleCharToken(currentChar) ||
        this.isWhitespace(currentChar) ||
        this.isNewline(currentChar)
      )
        break;

      buf += currentChar;
    }

    if (
      KinaLexerProcessor.TOKEN_KEYWORD.includes(
        buf as keyof typeof KinaLexerProcessor.TOKEN_KEYWORD_MAP,
      )
    )
      return true;
    return false;
  }

  private isDirective(chars: string, char: string) {
    let buf = "";
    let currentChar = char;

    for (let i = this.cursorPosition; i < chars.length; i++) {
      currentChar = chars[i]!;

      if (
        this.isSingleCharToken(currentChar) ||
        this.isWhitespace(currentChar) ||
        this.isNewline(currentChar)
      )
        break;

      buf += currentChar;
    }

    if (
      KinaLexerProcessor.TOKEN_DIRECTIVE.includes(
        buf as keyof typeof KinaLexerProcessor.TOKEN_DIRECTIVE_MAP,
      )
    )
      return true;
    return false;
  }

  private isType(chars: string, char: string) {
    let buf = "";
    let currentChar = char;

    for (let i = this.cursorPosition; i < chars.length; i++) {
      currentChar = chars[i]!;

      if (
        this.isSingleCharToken(currentChar) ||
        this.isWhitespace(currentChar) ||
        this.isNewline(currentChar)
      )
        break;

      buf += currentChar;
    }

    if (
      KinaLexerProcessor.TOKEN_TYPE.includes(
        buf as keyof typeof KinaLexerProcessor.TOKEN_TYPE_MAP,
      )
    )
      return true;
    return false;
  }

  private isIdentifier(char: string, charIsFirst: boolean) {
    if (/[a-zA-Z\_\$]/.test(char)) return true;
    if (!charIsFirst && /\d/.test(char)) return true;
    return false;
  }

  private parseSingleCharToken(char: string) {
    this.tokens.push({
      kind: KinaLexerProcessor.TOKEN_SINGLE_CHAR_MAP[
        char as (typeof KinaLexerProcessor.TOKEN_SINGLE_CHAR)[number]
      ],
      value: char,
      len: 1,
      line: this.currentLine,
      col: this.currentCol,
    });
  }

  private parseNewline(_char: string) {
    this.currentLine++;
    this.currentCol = -1; // -1 because 1 is added on loop end -> 0
  }

  private parseNumber(chars: string, char: string) {
    let buf = "";
    let currentChar: string | undefined = char;

    while (currentChar && (this.isNumber(currentChar) || currentChar === ".")) {
      buf += currentChar;

      this.cursorPosition++;
      this.currentCol++;
      currentChar = chars[this.cursorPosition];
    }

    // Last char IS NOT valid, so we need to put cursor back
    this.cursorPosition--;
    this.currentCol--;

    const isFloat = buf.includes(".");
    this.tokens.push({
      kind: isFloat
        ? EKinaLexerTokenKind.LiteralFloat
        : EKinaLexerTokenKind.LiteralInt,
      value: buf,
      len: buf.length,
      col: this.currentCol - buf.length + 1,
      line: this.currentLine,
    });
  }

  private parseString(chars: string, char: string) {
    let buf = "";
    let currentChar: string | undefined = char;
    let wasOpen: boolean = false;
    let wasClosed: boolean = false;

    while (!wasClosed && currentChar) {
      // If currentChar is the same char that started the string
      // TODO: Add support for escaping using \" or \'
      if (currentChar == char) {
        if (!wasOpen) wasOpen = true;
        else wasClosed = true;
      }

      buf += currentChar;

      this.cursorPosition++;
      this.currentCol++;
      currentChar = chars[this.cursorPosition];
    }

    // Last char IS NOT valid, so we need to put cursor back
    this.cursorPosition--;
    this.currentCol--;

    this.tokens.push({
      kind: EKinaLexerTokenKind.LiteralString,
      value: buf.slice(1, -1),
      len: buf.length,
      line: this.currentLine,
      col: this.currentCol - buf.length + 1,
    });
  }

  private parseBoolean(chars: string, char: string) {
    if (this.isFalseBoolean(chars, char)) {
      this.tokens.push({
        kind: EKinaLexerTokenKind.LiteralBool,
        value: "false",
        len: 5,
        line: this.currentLine,
        col: this.currentCol,
      });

      this.cursorPosition += 4;
      this.currentCol += 4;
    } else if (this.isTrueBoolean(chars, char)) {
      this.tokens.push({
        kind: EKinaLexerTokenKind.LiteralBool,
        value: "true",
        len: 4,
        line: this.currentLine,
        col: this.currentCol,
      });

      this.cursorPosition += 3;
      this.currentCol += 3;
    } else {
      // Should never occur unless cursor position illegaly shifted
      this.logger.error("ASSERT: INVALID BOOLEAN");
    }
  }

  private parseKeyword(chars: string, char: string) {
    let buf = "";
    let currentChar: string | undefined = char;

    while (currentChar) {
      currentChar = chars[this.cursorPosition];

      if (
        !currentChar ||
        this.isSingleCharToken(currentChar) ||
        this.isWhitespace(currentChar) ||
        this.isNewline(currentChar)
      )
        break;

      buf += currentChar;

      this.cursorPosition++;
      this.currentCol++;
    }

    if (
      !KinaLexerProcessor.TOKEN_KEYWORD_MAP[
        buf as keyof typeof KinaLexerProcessor.TOKEN_KEYWORD_MAP
      ]
    ) {
      this.logger.error("ASSERT: INVALID KEYWORD");
      return;
    }

    this.cursorPosition--;
    this.currentCol--;

    this.tokens.push({
      kind: KinaLexerProcessor.TOKEN_KEYWORD_MAP[
        buf as keyof typeof KinaLexerProcessor.TOKEN_KEYWORD_MAP
      ],
      value: buf,
      len: buf.length,
      col: this.currentCol - buf.length + 1,
      line: this.currentLine,
    });
  }

  private parseDirective(chars: string, char: string) {
    let buf = "";
    let currentChar: string | undefined = char;

    while (currentChar) {
      currentChar = chars[this.cursorPosition];

      if (
        !currentChar ||
        this.isSingleCharToken(currentChar) ||
        this.isWhitespace(currentChar) ||
        this.isNewline(currentChar)
      )
        break;

      buf += currentChar;

      this.cursorPosition++;
      this.currentCol++;
    }

    if (
      !KinaLexerProcessor.TOKEN_DIRECTIVE_MAP[
        buf as keyof typeof KinaLexerProcessor.TOKEN_DIRECTIVE_MAP
      ]
    ) {
      this.logger.error("ASSERT: INVALID DIRECTIVE");
      return;
    }

    this.cursorPosition--;
    this.currentCol--;

    this.tokens.push({
      kind: KinaLexerProcessor.TOKEN_DIRECTIVE_MAP[
        buf as keyof typeof KinaLexerProcessor.TOKEN_DIRECTIVE_MAP
      ],
      value: buf,
      len: buf.length,
      col: this.currentCol - buf.length + 1,
      line: this.currentLine,
    });
  }

  private parseType(chars: string, char: string) {
    let buf = "";
    let currentChar: string | undefined = char;

    while (currentChar) {
      currentChar = chars[this.cursorPosition];

      if (
        !currentChar ||
        this.isSingleCharToken(currentChar) ||
        this.isWhitespace(currentChar) ||
        this.isNewline(currentChar)
      )
        break;

      buf += currentChar;

      this.cursorPosition++;
      this.currentCol++;
    }

    if (
      !KinaLexerProcessor.TOKEN_TYPE_MAP[
        buf as keyof typeof KinaLexerProcessor.TOKEN_TYPE_MAP
      ]
    ) {
      this.logger.error("ASSERT: INVALID TYPE");
      return;
    }

    this.cursorPosition--;
    this.currentCol--;

    this.tokens.push({
      kind: KinaLexerProcessor.TOKEN_TYPE_MAP[
        buf as keyof typeof KinaLexerProcessor.TOKEN_TYPE_MAP
      ],
      value: buf,
      len: buf.length,
      col: this.currentCol - buf.length + 1,
      line: this.currentLine,
    });
  }

  private parseIdentifier(chars: string, char: string) {
    let buf = "";
    let currentChar: string | undefined = char;

    while (currentChar) {
      currentChar = chars[this.cursorPosition];

      if (
        !currentChar ||
        this.isSingleCharToken(currentChar) ||
        this.isWhitespace(currentChar) ||
        this.isNewline(currentChar) ||
        !this.isIdentifier(currentChar, false)
      )
        break;

      buf += currentChar;

      this.cursorPosition++;
      this.currentCol++;
    }

    this.cursorPosition--;
    this.currentCol--;

    this.tokens.push({
      kind: EKinaLexerTokenKind.Identifier,
      value: buf,
      len: buf.length,
      col: this.currentCol - buf.length + 1,
      line: this.currentLine,
    });
  }
}

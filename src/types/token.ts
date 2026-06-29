export enum EKinaLexerTokenKind {
  KeywordFunction = "kina.keyword.function",
  KeywordReturn = "kina.keyword.return",
  KeywordExtern = "kina.keyword.extern",

  DirectiveInclude = "kina.directive.include",

  Identifier = "kina.identifier",

  TypeInt32 = "kina.type.int32",
  TypeBool = "kina.type.bool",
  TypeString = "kina.type.string",

  LiteralInt = "kina.literal.int",
  LiteralFloat = "kina.literal.float",
  LiteralBool = "kina.literal.bool",
  LiteralString = "kina.literal.string",

  ParentheseOpen = "kina.parenthese.open",
  ParentheseClose = "kina.parenthese.close",
  BracketOpen = "kina.bracket.open",
  BracketClose = "kina.kracket.close",
  BraceOpen = "kina.brace.open",
  BraceClose = "kina.brace.close",
  Colon = "kina.colon",
  Semicolon = "kina.semicolon",
  Comma = "kina.comma",
  Dot = "kina.dot",

  EOF = "kina.eof",
}

export type IKinaLexerTokenKindType =
  | EKinaLexerTokenKind.TypeInt32
  | EKinaLexerTokenKind.TypeString
  | EKinaLexerTokenKind.TypeBool;

export type IKinaLexerTokenKindLiteral =
  | EKinaLexerTokenKind.LiteralInt
  | EKinaLexerTokenKind.LiteralFloat
  | EKinaLexerTokenKind.LiteralBool
  | EKinaLexerTokenKind.LiteralString;

export interface IKinaLexerTokenDefinition {
  kind: EKinaLexerTokenKind;
  value: string;
  line: number;
  col: number;
  len: number;
}

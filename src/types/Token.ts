export enum TokenKind {
  ParentheseOpen = "lex.ParentheseOpen",
  ParentheseClose = "lex.ParentheseClose",
  BracketOpen = "lex.BracketOpen",
  BracketClose = "lex.BracketClose",
  BraceOpen = "lex.BraceOpen",
  BraceClose = "lex.BraceClose",

  Colon = "lex.Colon",
  Semicolon = "lex.Semicolon",
  Comma = "lex.Comma",
  Dot = "lex.Dot",

  KeywordFunction = "lex.KeywordFunction",
  KeywordVariable = "lex.KeywordVariable",
  KeywordMutable = "lex.KeywordMutable",
  KeywordReturn = "lex.KeywordReturn",
  KeywordExtern = "lex.KeywordExtern",

  Comment = "lex.Comment",

  DirectiveInclude = "lex.DirectiveInclude",

  TypeVoid = "lex.TypeVoid",
  TypeInt = "lex.TypeInt",
  TypeBool = "lex.TypeBool",

  LiteralBoolean = "lex.LiteralBoolean",
  LiteralString = "lex.LiteralString",
  LiteralInteger = "lex.LiteralInteger",
  LiteralFloat = "lex.LiteralFloat",

  OperatorAssign = "lex.OperatorAssign",
}

export interface TokenSpan {
  start: {
    line: number;
    column: number;
  };
  end: {
    line: number;
    column: number;
  };
}

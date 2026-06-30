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

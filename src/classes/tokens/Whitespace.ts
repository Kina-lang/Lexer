import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class WhitespaceToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.Whitespace, span);
  }
}

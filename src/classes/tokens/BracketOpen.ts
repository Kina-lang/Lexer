import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class BracketOpenToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.BracketOpen, span);
  }
}

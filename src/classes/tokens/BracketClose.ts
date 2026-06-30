import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class BracketCloseToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.BracketClose, span);
  }
}

import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class SemicolonToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.Semicolon, span);
  }
}

import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class KeywordReturnToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.KeywordReturn, span, true);
  }

  override reconstruct(): string {
    return "return";
  }
}

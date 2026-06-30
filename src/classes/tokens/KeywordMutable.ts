import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class KeywordMutableToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.KeywordMutable, span);
  }

  override reconstruct(): string {
    return "mut";
  }
}

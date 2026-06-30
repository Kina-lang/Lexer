import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class BraceOpenToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.BraceOpen, span);
  }

  override reconstruct(): string {
    return "{";
  }
}

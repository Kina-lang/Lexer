import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class BraceCloseToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.BraceClose, span);
  }

  override reconstruct(): string {
    return "}";
  }
}

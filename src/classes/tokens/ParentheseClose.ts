import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class ParentheseCloseToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.ParentheseClose, span, true);
  }

  override reconstruct(): string {
    return ")";
  }
}

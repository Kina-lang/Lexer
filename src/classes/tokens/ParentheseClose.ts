import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class ParentheseCloseToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.ParentheseClose, span);
  }

  override reconstruct(): string {
    return ")";
  }
}

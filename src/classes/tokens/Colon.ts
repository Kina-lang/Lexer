import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class ColonToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.Colon, span, true);
  }

  override reconstruct(): string {
    return ":";
  }
}

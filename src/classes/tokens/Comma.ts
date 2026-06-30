import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class CommaToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.Comma, span);
  }

  override reconstruct(): string {
    return ",";
  }
}

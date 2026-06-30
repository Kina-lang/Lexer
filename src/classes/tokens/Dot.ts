import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class DotToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.Dot, span);
  }

  override reconstruct(): string {
    return ".";
  }
}

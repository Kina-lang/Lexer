import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class NewlineToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.Newline, span);
  }

  override reconstruct(): string {
    return "\n";
  }
}

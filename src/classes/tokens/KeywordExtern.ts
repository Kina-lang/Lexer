import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class KeywordExternToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.KeywordExtern, span);
  }

  override reconstruct(): string {
    return "extern";
  }
}

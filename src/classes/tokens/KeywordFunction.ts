import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class KeywordFunctionToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.KeywordFunction, span);
  }

  override reconstruct(): string {
    return "func";
  }
}

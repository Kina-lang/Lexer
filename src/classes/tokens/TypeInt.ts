import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class TypeIntToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.TypeInt, span);
  }

  override reconstruct(): string {
    return "int";
  }
}

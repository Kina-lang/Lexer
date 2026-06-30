import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class TypeVoidToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.TypeVoid, span);
  }

  override reconstruct(): string {
    return "void";
  }
}

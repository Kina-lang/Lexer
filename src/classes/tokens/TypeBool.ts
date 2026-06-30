import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class TypeBoolToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.TypeBool, span);
  }
}

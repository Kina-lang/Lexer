import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class OperatorAssignToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.OperatorAssign, span);
  }
}

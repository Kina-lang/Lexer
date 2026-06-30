import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class KeywordVariableToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.KeywordVariable, span);
  }
}

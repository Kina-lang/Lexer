import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class DirectiveIncludeToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.DirectiveInclude, span);
  }
}

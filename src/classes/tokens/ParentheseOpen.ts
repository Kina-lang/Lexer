import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class ParentheseOpenToken extends BaseToken {
  constructor(span: TokenSpan) {
    super(TokenKind.ParentheseOpen, span);
  }
}

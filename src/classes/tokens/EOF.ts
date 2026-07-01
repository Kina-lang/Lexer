import { TokenKind } from "../../types/Token";
import { BaseToken } from "./_base";

export class EOFToken extends BaseToken {
  constructor() {
    super(TokenKind.EOF, null, true);
  }

  override reconstruct(): string {
    return "";
  }
}

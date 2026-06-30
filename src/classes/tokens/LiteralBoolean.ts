import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class LiteralBooleanToken extends BaseToken {
  private readonly _value: "true" | "false";

  constructor(span: TokenSpan, value: "true" | "false") {
    super(TokenKind.LiteralBoolean, span);
    this._value = value;
  }

  public get value(): "true" | "false" {
    return this._value;
  }

  override export(): ReturnType<BaseToken["export"]> & {
    value: "true" | "false";
  } {
    const baseExport = super.export();

    return {
      ...baseExport,
      value: this.value,
    };
  }
}

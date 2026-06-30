import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class LiteralStringToken extends BaseToken {
  private readonly _value: string;

  constructor(span: TokenSpan, value: string) {
    super(TokenKind.LiteralString, span);
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }

  override export(): ReturnType<BaseToken["export"]> & {
    value: string;
  } {
    const baseExport = super.export();

    return {
      ...baseExport,
      value: this.value,
    };
  }

  override reconstruct(): string {
    return this.value;
  }
}

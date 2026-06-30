import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class WhitespaceToken extends BaseToken {
  private readonly _value: string;

  constructor(span: TokenSpan, value: string) {
    super(TokenKind.Whitespace, span);

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
      value: this._value,
    };
  }

  override reconstruct(): string {
    return this._value;
  }
}

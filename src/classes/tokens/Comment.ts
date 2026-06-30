import { TokenKind, type TokenSpan } from "../../types/Token";
import { BaseToken } from "./_base";

export class CommentToken extends BaseToken {
  private readonly _value: string;

  constructor(span: TokenSpan, content: string) {
    super(TokenKind.Comment, span);
    this._value = content;
  }

  public get value(): string {
    return this._value;
  }

  public override export(): ReturnType<BaseToken["export"]> & {
    value: string;
  } {
    const r = super.export();

    return {
      ...r,
      value: this.value,
    };
  }
}

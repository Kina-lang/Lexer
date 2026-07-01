import { inspect } from "util";
import type { TokenKind, TokenSpan } from "../../types/Token";

export abstract class BaseToken {
  protected readonly _kind: TokenKind;
  protected readonly _span: TokenSpan | null = null;
  protected readonly _isMandatory: boolean = false;

  constructor(
    kind: TokenKind,
    span: TokenSpan | null = null,
    isMandatory: boolean = false,
  ) {
    this._kind = kind;
    this._span = span;
    this._isMandatory = isMandatory;
  }

  public get kind(): TokenKind {
    return this._kind;
  }

  public get span(): TokenSpan | null {
    return this._span;
  }

  public get isMandatory(): boolean {
    return this._isMandatory;
  }

  export(): {
    kind: TokenKind;
    span?: [[number | null, number | null], [number | null, number | null]];
  } {
    const spanIsNull = this.span === null;

    return {
      kind: this.kind,
      ...(spanIsNull
        ? {}
        : {
            span: [
              [this.span?.start.line ?? null, this.span?.start.column ?? null],
              [this.span?.end.line ?? null, this.span?.end.column ?? null],
            ],
          }),
    };
  }

  abstract reconstruct(): string;

  [inspect.custom](): string {
    return `Token<${this.kind}> ${inspect(this.export(), { depth: null })}`;
  }
}

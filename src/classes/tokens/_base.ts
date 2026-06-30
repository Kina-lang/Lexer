import { inspect } from "util";
import type { TokenKind, TokenSpan } from "../../types/Token";

export abstract class BaseToken {
  protected readonly _kind: TokenKind;
  protected readonly _span: TokenSpan | null = null;

  constructor(kind: TokenKind, span: TokenSpan | null = null) {
    this._kind = kind;
    this._span = span;
  }

  public get kind(): TokenKind {
    return this._kind;
  }

  public get span(): TokenSpan | null {
    return this._span;
  }

  export(): {
    kind: TokenKind;
    span: [[number | null, number | null], [number | null, number | null]];
  } {
    return {
      kind: this.kind,
      span: [
        [this.span?.start.line ?? null, this.span?.start.column ?? null],
        [this.span?.end.line ?? null, this.span?.end.column ?? null],
      ],
    };
  }

  [inspect.custom](): string {
    return `Token<${this.kind}> ${inspect(this.export(), { depth: null })}`;
  }
}

import { KinaAssertionError } from "@kina-lang/utils";
import { TokenKind } from "../types/Token";
import type { BaseToken } from "./tokens/_base";
import { SemicolonToken } from "./tokens/Semicolon";

export class KinaASI {
  // Keywords that should be followed by an automatic semicolon insertion if they are followed by a newline
  private readonly _targetKeywords: Set<TokenKind> = new Set([
    TokenKind.KeywordReturn,
  ]);

  constructor() {}

  /**
   * Takes an array of tokens and processes them for automatic semicolon insertion (ASI)
   * @param tokens
   * @returns
   */
  process(tokens: BaseToken[]): BaseToken[] {
    const processedTokens: BaseToken[] = [];
    let i = 0;

    // Loop through the tokens and process them for ASI
    while (i < tokens.length) {
      const currentToken = tokens[i];
      const nextToken = tokens[i + 1];

      if (!currentToken)
        throw new KinaAssertionError(`Unexpected end of tokens at index ${i}`);

      // If there is no next token, we are at the end of the stream, so we can just push the current token and break
      if (!nextToken) {
        processedTokens.push(currentToken);
        break;
      }

      // If the current token is a target keyword and the next token
      // is a newline, we insert a semicolon after the current token
      if (
        this._targetKeywords.has(currentToken.kind) &&
        nextToken.kind === TokenKind.Newline
      ) {
        processedTokens.push(currentToken);

        processedTokens.push(
          new SemicolonToken({
            start: nextToken.span!.start,
            end: nextToken.span!.start,
          }),
        ); // Zero-width token to represent the inserted semicolon
        processedTokens.push(nextToken);

        i += 2; // Skip the next token since we already processed it
        continue;
      }

      // If not target keyword/not followed by newline, just push
      // the current token and move to the next
      processedTokens.push(currentToken);
      i++;
    }

    return processedTokens;
  }
}

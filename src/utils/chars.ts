export function isEndOfLine(char: string): boolean {
  return char === "\n" || char === "\r";
}

export function isWhitespace(char: string): boolean {
  return char === " " || char === "\t";
}

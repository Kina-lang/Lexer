import type { CharacterStream } from "../CharacterStream";
import type { BaseToken } from "../tokens/_base";

export abstract class BaseTokenizer {
  abstract canTokenize(characterStream: CharacterStream): boolean;
  abstract tokenize(characterStream: CharacterStream): BaseToken[];
}

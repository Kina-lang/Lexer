import { KinaLogger } from "@kina-lang/utils";
import {
  EKinaLexerTokenKind,
  type IKinaLexerTokenDefinition,
} from "./types/token";
import { KinaLexerProcessor } from "./processor";

export class KinaLexer {
  private readonly logger: KinaLogger = new KinaLogger(KinaLexer.name);

  public async process(fileName: string, fileContents: string) {
    this.logger.info(`Processing ${fileName}`);

    const processor = new KinaLexerProcessor();
    const tokens = await processor.process(fileName, fileContents);

    return tokens;
  }
}

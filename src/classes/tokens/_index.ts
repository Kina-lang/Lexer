import { BraceCloseToken } from "./BraceClose";
import { BraceOpenToken } from "./BraceOpen";
import { BracketCloseToken } from "./BracketClose";
import { BracketOpenToken } from "./BracketOpen";
import { ColonToken } from "./Colon";
import { CommaToken } from "./Comma";
import { DotToken } from "./Dot";
import { KeywordExternToken } from "./KeywordExtern";
import { KeywordFunctionToken } from "./KeywordFunction";
import { KeywordMutableToken } from "./KeywordMutable";
import { KeywordReturnToken } from "./KeywordReturn";
import { KeywordVariableToken } from "./KeywordVariable";
import { OperatorAssignToken } from "./OperatorAssign";
import { ParentheseCloseToken } from "./ParentheseClose";
import { ParentheseOpenToken } from "./ParentheseOpen";
import { SemicolonToken } from "./Semicolon";

export {
  ParentheseOpenToken,
  ParentheseCloseToken,
  BracketOpenToken,
  BracketCloseToken,
  BraceOpenToken,
  BraceCloseToken,
  ColonToken,
  SemicolonToken,
  CommaToken,
  DotToken,
  KeywordFunctionToken,
  KeywordVariableToken,
  KeywordMutableToken,
  KeywordReturnToken,
  KeywordExternToken,
  OperatorAssignToken,
};

export const Tokens = {
  ParentheseOpen: ParentheseOpenToken,
  ParentheseClose: ParentheseCloseToken,
  BracketOpen: BracketOpenToken,
  BracketClose: BracketCloseToken,
  BraceOpen: BraceOpenToken,
  BraceClose: BraceCloseToken,

  Colon: ColonToken,
  Semicolon: SemicolonToken,
  Comma: CommaToken,
  Dot: DotToken,

  KeywordFunction: KeywordFunctionToken,
  KeywordVariable: KeywordVariableToken,
  KeywordMutable: KeywordMutableToken,
  KeywordReturn: KeywordReturnToken,
  KeywordExtern: KeywordExternToken,

  OperatorAssign: OperatorAssignToken,
};

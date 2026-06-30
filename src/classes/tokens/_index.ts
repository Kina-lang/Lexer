import { BraceCloseToken } from "./BraceClose";
import { BraceOpenToken } from "./BraceOpen";
import { BracketCloseToken } from "./BracketClose";
import { BracketOpenToken } from "./BracketOpen";
import { ColonToken } from "./Colon";
import { CommaToken } from "./Comma";
import { CommentToken } from "./Comment";
import { DirectiveIncludeToken } from "./DirectiveInclude";
import { DotToken } from "./Dot";
import { EOFToken } from "./EOF";
import { KeywordExternToken } from "./KeywordExtern";
import { KeywordFunctionToken } from "./KeywordFunction";
import { KeywordMutableToken } from "./KeywordMutable";
import { KeywordReturnToken } from "./KeywordReturn";
import { KeywordVariableToken } from "./KeywordVariable";
import { LiteralBooleanToken } from "./LiteralBoolean";
import { LiteralFloatToken } from "./LiteralFloat";
import { LiteralIntegerToken } from "./LiteralInteger";
import { LiteralStringToken } from "./LiteralString";
import { OperatorAssignToken } from "./OperatorAssign";
import { ParentheseCloseToken } from "./ParentheseClose";
import { ParentheseOpenToken } from "./ParentheseOpen";
import { SemicolonToken } from "./Semicolon";
import { TypeBoolToken } from "./TypeBool";
import { TypeIntToken } from "./TypeInt";
import { TypeVoidToken } from "./TypeVoid";

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
  CommentToken,
  DirectiveIncludeToken,
  TypeVoidToken,
  TypeIntToken,
  TypeBoolToken,
  LiteralBooleanToken,
  LiteralStringToken,
  LiteralIntegerToken,
  LiteralFloatToken,
  OperatorAssignToken,
  EOFToken,
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

  Comment: CommentToken,

  DirectiveInclude: DirectiveIncludeToken,

  TypeVoid: TypeVoidToken,
  TypeInt: TypeIntToken,
  TypeBool: TypeBoolToken,

  LiteralBoolean: LiteralBooleanToken,
  LiteralString: LiteralStringToken,
  LiteralInteger: LiteralIntegerToken,
  LiteralFloat: LiteralFloatToken,

  OperatorAssign: OperatorAssignToken,

  EOF: EOFToken,
};

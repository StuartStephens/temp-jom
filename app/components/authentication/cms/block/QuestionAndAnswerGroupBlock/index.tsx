import { QuestionAndAnswerGroup } from "../../../QuestionAndAnswerGroup";
import { IXHTMLString } from "../../types/core/CoreTypes";

export interface IQuestionAndAnswerGroupBlock {
  Heading: string;
  QuestionsAndAnswers: IQuestionAndAnswer[];
}

export interface IQuestionAndAnswer {
  Question: string;
  Answer: IXHTMLString;
}

export interface IQuestionAndAnswerGroupBlockProps
  extends IQuestionAndAnswerGroupBlock {}

export function QuestionAndAnswerGroupBlock(
  props: IQuestionAndAnswerGroupBlockProps
) {
  return (
    <QuestionAndAnswerGroup
      questionsAndAnswers={props.QuestionsAndAnswers}
      heading={props.Heading}
    />
  );
}

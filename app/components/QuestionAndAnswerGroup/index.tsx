import { Accordion, Container } from "react-bootstrap";
import { IQuestionAndAnswer } from "../cms/block/QuestionAndAnswerGroupBlock";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";

export interface IQuestionAndAnswerProps {
  heading: string;
  questionsAndAnswers: IQuestionAndAnswer[];
}

export function QuestionAndAnswerGroup(props: IQuestionAndAnswerProps) {
  const { questionsAndAnswers, heading } = props;
  return (
    <Container
      fluid
      className="question-and-answer-group mb-3 page-gutter d-flex flex-column"
    >
      {heading && <h3>{heading}</h3>}
      <Container>
        <Accordion defaultActiveKey="0">
          {questionsAndAnswers &&
            questionsAndAnswers.map((qa: IQuestionAndAnswer, index: number) => {
              return (
                <Accordion.Item key={qa.Question} eventKey={"" + index}>
                  <Accordion.Header>
                    <Container>
                      <strong>
                        <small className="text-uppercase pe-2">Question:</small>
                      </strong>
                      {qa.Question}
                    </Container>
                  </Accordion.Header>
                  <Accordion.Body>
                    <strong className="text-uppercase ">Answer:</strong>
                    <XHTMLRenderer xhtml={qa.Answer} />
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
        </Accordion>
      </Container>
    </Container>
  );
}

import TitleCard from "../components/TitleCard";
import styled from "styled-components";
import BtnAddQuestion from "../components/BtnAddQuestion";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { QuestionProps } from "../redux/modules/questionSlice";
import QuestionCard from "../components/QuestionCard";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardList = styled.div``;

const Form = () => {
  const questionList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });
  return (
    <Wrapper>
      <CardList>
        <TitleCard />
        {questionList.map((card) => (
          <QuestionCard
            key={card.id}
            id={card.id}
            questionTitle={card.questionTitle}
            questionType={card.questionType}
            contents={card.contents}
            isRequired={card.isRequired}
          />
        ))}
      </CardList>
      <BtnAddQuestion />
    </Wrapper>
  );
};

export default Form;

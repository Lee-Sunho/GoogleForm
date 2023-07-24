import styled from "styled-components";
import TitleCard from "../components/TitleCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { QuestionProps } from "../redux/modules/questionSlice";
import ResultCard from "../components/ResultCard";

const CardListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardList = styled.div``;

const Result = () => {
  const questionList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });
  return (
    <CardListWrapper>
      <CardList>
        <TitleCard />
        {questionList.map((card) => (
          <ResultCard key={card.id} id={card.id} />
        ))}
      </CardList>
    </CardListWrapper>
  );
};

export default Result;

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { QuestionProps, clearAnswer } from "../redux/modules/questionSlice";
import TitleCard from "../components/TitleCard";
import QuestionCard from "../components/QuestionCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardList = styled.div``;

const ButtonArea = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 530px;
  justify-content: space-between;
  align-items: center;
`;

const BtnSubmit = styled.button`
  width: 72px;
  height: 36px;
  background-color: ${(props) => props.theme.darkpurple};
  color: white;
  border: none;
  border-radius: 4px;
`;

const BtnClear = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.darkpurple};
  border-radius: 4px;
  padding: 6px;
`;

const Preview = () => {
  const dispatch = useDispatch();
  const questionList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });

  const handleClear = () => {
    dispatch(clearAnswer({}));
    window.location.reload();
  };

  return (
    <Wrapper>
      <CardListWrapper>
        <CardList>
          <TitleCard />
          {questionList.map((card) => (
            <QuestionCard
              key={card.id}
              id={card.id}
              questionTitle={card.questionTitle}
              isRequired={card.isRequired}
            />
          ))}
        </CardList>
      </CardListWrapper>
      <ButtonArea>
        <BtnSubmit>제출</BtnSubmit>
        <BtnClear onClick={handleClear}>양식 지우기</BtnClear>
      </ButtonArea>
    </Wrapper>
  );
};

export default Preview;

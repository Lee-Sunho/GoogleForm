import TitleCard from "../components/TitleCard";
import styled from "styled-components";
import BtnAddQuestion from "../components/BtnAddQuestion";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import {
  QuestionProps,
  moveOption,
  moveQuestion,
} from "../redux/modules/questionSlice";
import QuestionCard from "../components/QuestionCard";
import Header from "../components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFocus } from "../redux/modules/focusSlice";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const HeaderWrapper = styled.div``;

const CardListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CardList = styled.div``;

const Form = () => {
  const dispatch = useDispatch();
  const questionList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });

  useEffect(() => {
    dispatch(setFocus("title"));
  }, []);

  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <CardListWrapper>
        <Droppable droppableId="question">
          {(provieded) => (
            <CardList {...provieded.droppableProps} ref={provieded.innerRef}>
              <TitleCard />
              {questionList.map((card, index) => (
                <QuestionCard
                  key={card.id}
                  id={card.id}
                  index={index}
                  questionTitle={card.questionTitle}
                  isRequired={card.isRequired}
                />
              ))}
            </CardList>
          )}
        </Droppable>
        <BtnAddQuestion />
      </CardListWrapper>
    </>
  );
};

export default Form;

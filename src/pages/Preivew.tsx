import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { QuestionProps, clearAnswer } from "../redux/modules/questionSlice";
import TitleCard from "../components/TitleCard";
import PreviewCard from "../components/PreviewCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  padding: 0px 8px 0px 8px;
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

const RequiredArea = styled.div`
  width: 530px;
  padding: 8px;
  font-size: 12px;
  color: red;
`;

const Preview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questionList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });

  const [inValidQuestions, setInvalidQuestions] = useState<string[]>([]);

  const requiredList = questionList.filter((card) => card.isRequired === true);

  const handleClear = () => {
    dispatch(clearAnswer({}));
    window.location.reload();
  };

  useEffect(() => {
    const func = async () => {
      try {
        await dispatch(clearAnswer({}));
      } catch (err) {
        console.log(err);
      }
    };
    func();
  }, []);

  useEffect(() => {
    checkRequired();
  }, [inValidQuestions]);

  const checkRequired = () => {
    const temp: string[] = [];
    for (let i = 0; i < requiredList.length; i++) {
      const card = requiredList[i];
      let isFulfill = false;
      for (let j = 0; j < card.contents.length; j++) {
        const item = card.contents[j];
        if (item.isAnswer === true) {
          isFulfill = true;
          break;
        }
      }
      if (!isFulfill) {
        temp.push(card.id);
      }
    }
    setInvalidQuestions(temp);
  };

  const handleSubmit = async () => {
    try {
      await checkRequired();
    } catch (err) {
      console.log(err);
    }
    console.log(inValidQuestions.length);
    if (inValidQuestions.length === 0) {
      navigate("/preview/result");
    }
  };

  return (
    <Wrapper>
      <CardListWrapper>
        <CardList>
          <TitleCard />
          {questionList.map((card, index) => (
            <PreviewCard
              key={card.id}
              id={card.id}
              index={index}
              questionTitle={card.questionTitle}
              isRequired={card.isRequired}
            />
          ))}
        </CardList>
      </CardListWrapper>
      <RequiredArea>
        {inValidQuestions.length > 0 ? (
          <span>필수 질문들에 답해주세요</span>
        ) : null}
      </RequiredArea>
      <ButtonArea>
        <BtnSubmit onClick={handleSubmit}>제출</BtnSubmit>
        <BtnClear onClick={handleClear}>양식 지우기</BtnClear>
      </ButtonArea>
    </Wrapper>
  );
};

export default Preview;

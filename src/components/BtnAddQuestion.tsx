import styled from "styled-components";
import { useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, QuestionProps } from "../redux/modules/questionSlice";
import { RootState } from "../redux/configureStore";
import { setFocus } from "../redux/modules/focusSlice";

const Button = styled.button`
  position: sticky;
  top: 100px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.bordergray};
  border-radius: 8px;
  margin-left: 16px;
  width: 48px;
  height: 48px;
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.icongray};
`;

const BtnAddQuestion = () => {
  const dispatch = useDispatch();

  const questionList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });

  useEffect(() => {
    if (questionList.length === 0) {
      const id = Date.now().toString();
      dispatch(
        addQuestion({
          id,
          questionTitle: "제목없는 질문",
        })
      );
      dispatch(setFocus(id));
    }
  }, []);
  const onClick = () => {
    const id = Date.now().toString();
    dispatch(
      addQuestion({
        id,
        questionTitle: "",
      })
    );
    dispatch(setFocus(id));
  };
  return (
    <Button onClick={onClick}>
      <Icon icon={faPlus} size="2x" />
    </Button>
  );
};

export default BtnAddQuestion;

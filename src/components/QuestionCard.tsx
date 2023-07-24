import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { setFocus } from "../redux/modules/focusSlice";
import { setQuestionTitle } from "../redux/modules/questionSlice";
import SelectType from "./SelectType";
import ContentsArea from "./ContentsArea";
import CardFooter from "./CardFooter";
import { useMatch } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.bordergray};
  border-radius: 8px;
  background-color: white;
  margin-top: 13px;
  margin-bottom: 13px;
`;

const InfoWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  padding: 24px 24px 0px 24px;
`;

const FocusLine = styled.div<{ focused: boolean }>`
  position: absolute;
  left: 0px;
  background-color: ${(props) => props.theme.blue};
  width: 6px;
  height: 100%;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  visibility: ${(props) => (props.focused ? "visible" : "hidden")};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px, 24px;
  margin-right: 24px;
`;

const TitleInput = styled.input<{ focused: boolean }>`
  width: 100%;
  font-size: 14px;
  border: 0;
  outline: none;
  border-bottom: ${(props) =>
    props.focused ? `1px solid ${props.theme.bordergray}` : "none"};
  background-color: ${(props) =>
    props.focused ? `${props.theme.lightgray}` : "transparent"};
  padding: 16px;
  line-height: 135%;
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.darkpurple};
  }
  &:disabled {
    color: black;
    border-bottom: none;
    background-color: white;
  }
`;

const RequiredMark = styled.span`
  color: red;
`;

interface IProps {
  id: string;
  questionTitle: string;
  isRequired: boolean;
}

const QuestionCard = ({ id, questionTitle, isRequired }: IProps) => {
  const previewMatch = useMatch("/preview");
  const dispatch = useDispatch();
  const focusedId = useSelector<RootState, string>((state) => {
    return state.focus.focusedId;
  });

  const handleClick = () => {
    dispatch(setFocus(id));
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionTitle({ id: id, questionTitle: e.target.value }));
  };

  return (
    <Wrapper onClick={handleClick}>
      {previewMatch ? null : (
        <FocusLine focused={focusedId === "title" ? true : false} />
      )}
      <InfoWrapper>
        <TitleWrapper>
          {previewMatch && isRequired ? <RequiredMark>*</RequiredMark> : null}
          <TitleInput
            onChange={handleTitle}
            disabled={previewMatch ? true : false}
            focused={focusedId === id ? true : false}
            value={questionTitle}
            placeholder="질문"
          />
        </TitleWrapper>
        <SelectType id={id} isPreview={previewMatch} />
      </InfoWrapper>
      <ContentsArea id={id} />
      {focusedId === id && !previewMatch ? <CardFooter id={id} /> : null}
    </Wrapper>
  );
};

export default QuestionCard;

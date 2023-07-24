import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { QuestionProps } from "../redux/modules/questionSlice";
import SelectType from "./SelectType";
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
  padding: 12px 12px 0px 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px, 24px;
  margin-right: 24px;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 14px;
  border: 0;
  outline: none;
  padding: 16px;
  line-height: 135%;
  &:disabled {
    color: black;
    border-bottom: none;
    background-color: white;
  }
`;

const ContentsArea = styled.div`
  padding: 0px 24px 24px 24px;
`;

const ContentsText = styled.span`
  padding-left: 8px;
  font-size: 12px;
`;
interface IProps {
  id: string;
}

const ResultCard = ({ id }: IProps) => {
  const resultMatch = useMatch("/preview/result");

  const cardList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });
  const current = cardList.find((card) => card.id === id);

  return (
    <Wrapper>
      <InfoWrapper>
        <TitleWrapper>
          <TitleInput
            disabled={resultMatch ? true : false}
            value={current?.questionTitle}
            placeholder="질문"
          />
        </TitleWrapper>
        <SelectType id={id} isPreview={resultMatch} />
      </InfoWrapper>
      <ContentsArea>
        {current?.contents.map((item) =>
          item.isAnswer ? <ContentsText>{item.text}</ContentsText> : null
        )}
      </ContentsArea>
    </Wrapper>
  );
};

export default ResultCard;

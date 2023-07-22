import styled from "styled-components";
import { QuestionProps, QuestionTypes } from "../redux/modules/questionSlice";
import ItemShortText from "./ItemShortText";
import ItemLongText from "./ItemLongText";
import ItemRadio from "./ItemRadio";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";

const Wrapper = styled.div`
  padding: 0px 24px 24px 24px;
`;
interface IProps {
  id: string;
}

const ContentsArea = ({ id }: IProps) => {
  const questionList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });
  const current = questionList.find((card) => card.id === id);
  return (
    <Wrapper>
      {(() => {
        switch (current?.questionType) {
          case QuestionTypes.SHORTTEXT:
            return <ItemShortText isPreview={false} />;

          case QuestionTypes.LONGTEXT:
            return <ItemLongText isPreview={false} />;

          case QuestionTypes.RADIO:
            return <ItemRadio contents={current.contents} isPreview={false} />;
        }
      })()}
    </Wrapper>
  );
};

export default ContentsArea;

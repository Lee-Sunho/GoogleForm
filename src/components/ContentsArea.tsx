import styled from "styled-components";
import { QuestionProps, QuestionTypes } from "../redux/modules/questionSlice";
import ItemShortText from "./ItemShortText";
import ItemLongText from "./ItemLongText";
import ItemRadio from "./ItemRadio";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import ItemCheckbox from "./ItemCheckbox";
import ItemDropdown from "./ItemDropdown";
import { useMatch } from "react-router-dom";
import PreviewDropdown from "./PreviewDropdown";

const Wrapper = styled.div`
  padding: 12px 24px 24px 24px;
`;
interface IProps {
  id: string;
}

const ContentsArea = ({ id }: IProps) => {
  const previewMatch = useMatch("/preview");
  const questionList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });
  const current = questionList.find((card) => card.id === id);
  return (
    <Wrapper>
      {(() => {
        switch (current?.questionType) {
          case QuestionTypes.SHORTTEXT:
            return (
              <ItemShortText
                id={id}
                isPreview={previewMatch}
                isRequired={current.isRequired}
              />
            );

          case QuestionTypes.LONGTEXT:
            return (
              <ItemLongText
                id={id}
                isPreview={previewMatch}
                isRequired={current.isRequired}
              />
            );

          case QuestionTypes.RADIO:
            return (
              <ItemRadio
                id={id}
                contents={current.contents}
                isPreview={previewMatch}
                isRequired={current.isRequired}
              />
            );

          case QuestionTypes.CHECKBOX:
            return (
              <ItemCheckbox
                id={id}
                contents={current.contents}
                isPreview={previewMatch}
                isRequired={current.isRequired}
              />
            );

          case QuestionTypes.DROPDOWN:
            return (
              <>
                {previewMatch ? (
                  <PreviewDropdown id={id} isRequired={current.isRequired} />
                ) : (
                  <ItemDropdown
                    id={id}
                    contents={current.contents}
                    isPreview={previewMatch}
                    isRequired={current.isRequired}
                  />
                )}
              </>
            );
        }
      })()}
    </Wrapper>
  );
};

export default ContentsArea;

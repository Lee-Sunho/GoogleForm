import styled from "styled-components";
import FormGroup from "@mui/material/FormGroup";
import {
  addOption,
  removeOption,
  ItemProps,
  setOptionText,
} from "../redux/modules/questionSlice";
import Icon_delete from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";

const Wrapper = styled.div`
  padding: 0px 24px 24px 24px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 320px;
  border: 0;
  outline: none;
  font-size: 13px;
  padding: 8px 0 8px 0;
  &:hover {
    border-bottom: 1px solid ${(props) => props.theme.bordergray};
  }
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.darkpurple};
  }
  &:read-only {
    border-bottom: 1px solid ${(props) => props.theme.bordergray};
    color: ${(props) => props.theme.textgray};
  }
`;

const DeleteButton = styled.div`
  width: 24px;
  height: 24px;
  color: ${(props) => props.theme.icongray};
`;

const AddOptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 13px;
`;

const AddOption = styled.span<{ isEtc: boolean }>`
  color: ${(props) => (props.isEtc ? props.theme.blue : props.theme.textgray)};
  font-size: 13px;
  margin-right: 5px;
  margin-left: ${(props) => (props.isEtc ? "5px" : "0px")};
  &:hover {
    background-color: ${(props) => props.theme.lightgray};
    border-bottom: ${(props) =>
      props.isEtc ? null : `1px solid ${props.theme.bordergray}`};
  }
`;

const NumberBox = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  text-align: center;
`;

interface IProps {
  isPreview: boolean;
  contents: ItemProps[];
}

const ItemDropdown = ({ isPreview, contents }: IProps) => {
  const dispatch = useDispatch();
  const focusedId = useSelector<RootState, string>((state) => {
    return state.focus.focusedId;
  });

  const handleAddOption = () => {
    const optionId = Date.now().toString();
    dispatch(addOption({ id: focusedId, optionId, text: "", isEtc: false }));
  };

  const handleAddEtcOption = () => {
    const optionId = Date.now().toString();
    dispatch(addOption({ id: focusedId, optionId, text: "기타", isEtc: true }));
  };

  const handleRemoveOption = (optionId: string) => {
    dispatch(removeOption({ optionId, id: focusedId }));
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionId: string
  ) => {
    dispatch(setOptionText({ id: focusedId, optionId, text: e.target.value }));
  };
  return (
    <Wrapper>
      <FormGroup>
        {contents.map((item, index) => (
          <ItemWrapper>
            <NumberBox>{index + 1}</NumberBox>
            <InputWrapper>
              <Input
                onChange={(e) => handleOnChange(e, item.optionId)}
                readOnly={item.isEtc ? true : false}
                value={item.text}
              />
            </InputWrapper>

            {contents.length > 1 ? (
              <DeleteButton onClick={() => handleRemoveOption(item.optionId)}>
                <Icon_delete fontSize="small" />
              </DeleteButton>
            ) : null}
          </ItemWrapper>
        ))}
        <ItemWrapper>
          <NumberBox>{contents.length + 1}</NumberBox>
          <AddOptionsWrapper>
            <AddOption onClick={handleAddOption} isEtc={false}>
              옵션 추가
            </AddOption>
          </AddOptionsWrapper>
        </ItemWrapper>
      </FormGroup>
    </Wrapper>
  );
};

export default ItemDropdown;
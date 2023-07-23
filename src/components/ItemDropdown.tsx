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
  &:hover {
    background-color: ${(props) => props.theme.lightgray};
    border-bottom: ${(props) =>
      props.isEtc ? null : `1px solid ${props.theme.bordergray}`};
  }
`;

const NumberBox = styled.div`
  display: flex;
  width: 33px;
  height: 33px;
  align-items: center;
  font-size: 14px;
  text-align: start;
`;

interface IProps {
  id: string;
  isPreview: boolean;
  contents: ItemProps[];
}

const ItemDropdown = ({ id, isPreview, contents }: IProps) => {
  const dispatch = useDispatch();
  const focusedId = useSelector<RootState, string>((state) => {
    return state.focus.focusedId;
  });

  const handleAddOption = () => {
    const optionId = Date.now().toString();
    dispatch(addOption({ id, optionId, text: "", isEtc: false }));
  };

  const handleRemoveOption = (optionId: string) => {
    dispatch(removeOption({ optionId, id }));
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    optionId: string
  ) => {
    dispatch(setOptionText({ id, optionId, text: e.target.value }));
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

            {contents.length > 1 && focusedId === id ? (
              <DeleteButton onClick={() => handleRemoveOption(item.optionId)}>
                <Icon_delete fontSize="small" />
              </DeleteButton>
            ) : null}
          </ItemWrapper>
        ))}
        {focusedId === id ? (
          <ItemWrapper>
            <NumberBox>{contents.length + 1}</NumberBox>
            <AddOptionsWrapper>
              <AddOption onClick={handleAddOption} isEtc={false}>
                옵션 추가
              </AddOption>
            </AddOptionsWrapper>
          </ItemWrapper>
        ) : null}
      </FormGroup>
    </Wrapper>
  );
};

export default ItemDropdown;

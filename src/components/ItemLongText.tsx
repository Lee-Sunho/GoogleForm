import styled from "styled-components";
import { PathMatch } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setText } from "../redux/modules/questionSlice";

const InputWrapper = styled.div`
  padding-left: 12px;
  padding-bottom: 12px;
`;

const Input = styled.textarea`
  resize: none;
  font-size: 12px;
  line-height: 8px;
  width: 100%;
  border: 0;
  outline: none;
  border-bottom: 1px solid ${(props) => props.theme.bordergray};
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.darkpurple};
  }
`;

interface IProps {
  id: string;
  isPreview: PathMatch | null;
  isRequired: boolean;
}

const ItemLongText = ({ id, isPreview, isRequired }: IProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    handleSetText(e.target.value);
  };
  const handleSetText = (value: string) => {
    dispatch(setText({ id, text: value }));
  };
  return (
    <InputWrapper>
      <Input
        onChange={onChange}
        disabled={!isPreview}
        placeholder="장문형 텍스트"
      />
    </InputWrapper>
  );
};

export default ItemLongText;

import styled from "styled-components";
import { PathMatch } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setText } from "../redux/modules/questionSlice";

const InputWrapper = styled.div`
  padding-left: 12px;
  padding-bottom: 12px;
`;
const Input = styled.input`
  font-size: 12px;
  width: 100%;
  border: 0;
  outline: none;
  line-height: 135%;
  border-bottom: 1px solid ${(props) => props.theme.bordergray};
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.darkpurple};
  }
`;

const RequiredArea = styled.div``;

const RequiredText = styled.span`
  color: red;
  font-size: 11px;
`;

interface IProps {
  id: string;
  isPreview: PathMatch | null;
  isRequired: boolean;
}

const ItemShortText = ({ id, isPreview, isRequired }: IProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSetText(e.target.value);
  };
  const handleSetText = (value: string) => {
    dispatch(setText({ id, text: value }));
  };
  return (
    <>
      <InputWrapper>
        <Input
          onChange={onChange}
          disabled={!isPreview}
          placeholder="단답형 텍스트"
        />
      </InputWrapper>
    </>
  );
};

export default ItemShortText;

import styled from "styled-components";
const Input = styled.input`
  padding-left: 24px;
  font-size: 12px;
  line-height: 15pt;
  width: 100%;
  border: 0;
  outline: none;
  line-height: 135%;
`;

interface IProps {
  isPreview: boolean;
}

const ItemShortText = ({ isPreview }: IProps) => {
  return <Input disabled={!isPreview} placeholder="단답형 텍스트" />;
};

export default ItemShortText;

import styled from "styled-components";
const Input = styled.input`
  font-size: 12px;
  line-height: 15pt;
  width: 100%;
  border: 0;
  outline: none;
  border-bottom: 1px solid ${(props) => props.theme.bordergray};
  line-height: 135%;
`;

interface IProps {
  isPreview: boolean;
}

const ItemLongText = ({ isPreview }: IProps) => {
  return <Input disabled={!isPreview} placeholder="장문형 텍스트" />;
};

export default ItemLongText;

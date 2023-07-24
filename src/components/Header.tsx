import styled from "styled-components";
import Icon_eye from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.bordergray};
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

const BtnPreview = styled.button`
  background-color: white;
  border: none;
  width: 35px;
  height: 35px;
  color: ${(props) => props.theme.icongray};
  cursor: pointer;
`;

const Header = () => {
  return (
    <Wrapper>
      <BtnPreview>
        <Link to={"/preview"} target="_blank">
          <Icon_eye />
        </Link>
      </BtnPreview>
    </Wrapper>
  );
};

export default Header;

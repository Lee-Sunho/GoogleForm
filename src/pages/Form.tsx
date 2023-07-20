import TitleCard from "../components/TitleCard";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = () => {
  return (
    <Wrapper>
      <TitleCard />
    </Wrapper>
  );
};

export default Form;

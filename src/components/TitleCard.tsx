import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../redux/configureStore";
import { setTitle, setDescription } from "../redux/modules/titleSlice";
import { setFocus } from "../redux/modules/focusSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid ${(props) => props.theme.bordergray};
  border-radius: 8px;
  background-color: white;
`;

const HeaderLine = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 10px;
  left: -1px;
  position: absolute;
  width: calc(100% + 2px);
  background-color: ${(props) => props.theme.darkpurple};
`;

const ContentWrapper = styled.div<{ focused: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  .input {
    border-bottom: ${(props) =>
      props.focused ? `1px solid ${props.theme.bordergray}` : "none"};
  }
`;

const FocusLine = styled.div<{ focused: boolean }>`
  position: absolute;
  top: 10px;
  left: 0px;
  background-color: ${(props) => props.theme.blue};
  width: 6px;
  height: calc(100% - 10px);
  border-bottom-left-radius: 8px;
  visibility: ${(props) => (props.focused ? "visible" : "hidden")};
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 8px, 24px;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 24px;
  font-weight: 400;
  border: 0;
  outline: none;
  //border-bottom: 1px solid ${(props) => props.theme.bordergray};
  line-height: 135%;
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.darkpurple};
  }
`;

const DescriptionWrapper = styled.div`
  margin-top: 8px;
  width: 100%;
`;

const DescriptionInput = styled.input`
  font-size: 14px;
  line-height: 15pt;
  width: 100%;
  border: 0;
  outline: none;
  //border-bottom: 1px solid ${(props) => props.theme.bordergray};
  line-height: 135%;
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.darkpurple};
  }
`;

const TitleCard = () => {
  const dispatch = useDispatch();
  const title = useSelector<RootState, string>((state) => {
    return state.title.title;
  });

  const focusedId = useSelector<RootState, string>((state) => {
    return state.focus.focusedId;
  });

  const handleClick = () => {
    dispatch(setFocus("title"));
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDescription(e.target.value));
  };

  return (
    <Wrapper onClick={handleClick}>
      <HeaderLine />
      <ContentWrapper focused={focusedId === "title" ? true : false}>
        <FocusLine focused={focusedId === "title" ? true : false} />
        <TitleWrapper className="input">
          <TitleInput onChange={onChangeTitle} value={title} />
        </TitleWrapper>
        <DescriptionWrapper>
          <DescriptionInput
            className="input"
            onChange={onChangeDescription}
            placeholder="설명을 입력하세요"
          />
        </DescriptionWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};
export default TitleCard;

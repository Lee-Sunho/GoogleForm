import styled from "styled-components";
import Icon_copy from "@mui/icons-material/ContentCopyRounded";
import Icon_trashcan from "@mui/icons-material/DeleteForeverOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  QuestionProps,
  copyQuestion,
  removeQuestion,
  toggleIsRequire,
} from "../redux/modules/questionSlice";
import { setFocus } from "../redux/modules/focusSlice";
import { RootState } from "../redux/configureStore";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0px 24px;
  padding: 12px;
  border-top: 1px solid ${(props) => props.theme.bordergray};
`;

const BtnCopy = styled(Icon_copy)`
  background-color: white;
  border: none;
  width: 25px;
  height: 25px;
  margin-right: 18px;
  color: ${(props) => props.theme.icongray};
  cursor: pointer;
`;

const BtnRemove = styled(Icon_trashcan)`
  background-color: white;
  border: none;
  width: 25px;
  height: 25px;
  margin-right: 18px;
  color: ${(props) => props.theme.icongray};
  cursor: pointer;
`;

const Line = styled.div`
  width: 0;
  height: 30px;
  margin-right: 4px;
  border-left: 1px solid ${(props) => props.theme.bordergray};
`;

const labelStyle = {
  "& .MuiFormControlLabel-label": {
    fontSize: "11px",
  },
};

interface IProps {
  id: string;
}

const CardFooter = ({ id }: IProps) => {
  const dispatch = useDispatch();

  const handleCopyAndSetFocus = async () => {
    try {
      const newId = Date.now().toString();

      await dispatch(copyQuestion({ id, newId }));
      dispatch(setFocus(newId));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleRemoveQuestion = () => {
    dispatch(removeQuestion({ id }));
  };

  const isRequired = useSelector<RootState, boolean | undefined>((state) => {
    const current = state.question.find((card) => card.id === id);
    return current?.isRequired;
  });

  const handleIsRequired = () => {
    dispatch(toggleIsRequire({ id }));
  };

  return (
    <Wrapper>
      <BtnCopy onClick={handleCopyAndSetFocus}>
        <Icon_copy fontSize="small" />
      </BtnCopy>
      <BtnRemove onClick={handleRemoveQuestion}>
        <Icon_trashcan fontSize="small" />
      </BtnRemove>
      <Line />
      <FormControlLabel
        sx={{ ...labelStyle }}
        labelPlacement="start"
        control={
          <Switch
            sx={{
              ".Mui-checked": {
                color: "#673ab7",
              },
              ".MuiSwitch-track": {
                border: "1px solid gray ",
                backgroundColor: "#F0EBF8 !important",
              },
            }}
            checked={isRequired}
            onChange={handleIsRequired}
            size="small"
          />
        }
        label="필수"
      />
    </Wrapper>
  );
};

export default CardFooter;

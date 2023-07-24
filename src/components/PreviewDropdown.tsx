import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";
import { QuestionProps, QuestionTypes } from "../redux/modules/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { setAnswer } from "../redux/modules/questionSlice";
import { useState } from "react";

const Item = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.icongray};
`;

const Text = styled.span`
  font-size: 12px;
  text-align: center;
  margin-left: 5px;
`;

interface IProps {
  id: string;
  isRequired: boolean;
}

const PreviewDropdown = ({ id, isRequired }: IProps) => {
  const questionType = QuestionTypes.DROPDOWN;
  const [selected, setSelected] = useState<string>();
  const dispatch = useDispatch();
  const cardList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });
  const current = cardList.find((card) => card.id === id);

  const handleSelect = (e: SelectChangeEvent) => {
    setSelected(e.target.value);
    handleAnswer(e.target.value);
  };

  const handleAnswer = (value: string) => {
    dispatch(setAnswer({ id, text: value, questionType }));
  };
  return (
    <FormControl
      sx={{
        m: 1,
        width: 230,
        height: 48,
      }}
      size="small"
    >
      <Select
        onChange={handleSelect}
        value={selected}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
      >
        {current?.contents.map((item) => (
          <MenuItem key={item.optionId} value={item.text}>
            <Item>
              <Text>{item.text}</Text>
            </Item>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PreviewDropdown;

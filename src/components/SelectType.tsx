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
import { setQuestionType } from "../redux/modules/questionSlice";
import Icon_shortText from "@mui/icons-material/ShortTextOutlined";
import Icon_longText from "@mui/icons-material/SubjectOutlined";
import Icon_radio from "@mui/icons-material/RadioButtonCheckedOutlined";
import Icon_checkbox from "@mui/icons-material/CheckBoxOutlined";
import Icon_dropdown from "@mui/icons-material/ArrowDropDownCircleOutlined";

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
}

const SelectType = ({ id }: IProps) => {
  const dispatch = useDispatch();
  const cardList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });
  const current = cardList.find((card) => card.id === id);

  const handleSelect = (e: SelectChangeEvent) => {
    dispatch(setQuestionType({ id: id, questionType: e.target.value }));
  };
  return (
    <FormControl
      sx={{
        display: "block",
        m: 1,
        width: 208,
        height: 48,
      }}
      size="small"
    >
      <Select
        onChange={handleSelect}
        value={current?.questionType}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
      >
        <MenuItem value={QuestionTypes.SHORTTEXT}>
          <Item>
            <Icon_shortText />
            <Text>단답형</Text>
          </Item>
        </MenuItem>
        <MenuItem value={QuestionTypes.LONGTEXT}>
          <Item>
            <Icon_longText />
            <Text>장문형</Text>
          </Item>
        </MenuItem>
        <MenuItem value={QuestionTypes.RADIO}>
          <Item>
            <Icon_radio />
            <Text>객관식 질문</Text>
          </Item>
        </MenuItem>
        <MenuItem value={QuestionTypes.CHECKBOX}>
          <Item>
            <Icon_checkbox />
            <Text>체크박스</Text>
          </Item>
        </MenuItem>
        <MenuItem value={QuestionTypes.DROPDOWN}>
          <Item>
            <Icon_dropdown />
            <Text>드롭다운</Text>
          </Item>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectType;

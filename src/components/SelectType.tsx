import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import { QuestionProps, QuestionTypes } from "../redux/modules/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { setQuestionType } from "../redux/modules/questionSlice";

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
    <FormControl sx={{ m: 1, width: 208, height: 48 }} size="small">
      <Select
        onChange={handleSelect}
        value={current?.questionType}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
      >
        <MenuItem value={QuestionTypes.SHORTTEXT}>단답형</MenuItem>
        <MenuItem value={QuestionTypes.LONGTEXT}>장문형</MenuItem>
        <MenuItem value={QuestionTypes.RADIO}>객관식 질문</MenuItem>
        <MenuItem value={QuestionTypes.CHECKBOX}>체크박스</MenuItem>
        <MenuItem value={QuestionTypes.DROPDOWN}>드롭다운</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectType;

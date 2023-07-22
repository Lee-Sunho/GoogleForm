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
import { setType } from "../redux/modules/questionSlice";

const SelectType = () => {
  const dispatch = useDispatch();
  const focusId = useSelector<RootState, string>((state) => {
    return state.focus.focus;
  });
  const cardList = useSelector<RootState, QuestionProps[]>((state) => {
    return state.question;
  });
  const current = cardList.find((card) => card.id === focusId);

  const handleSelect = (e: SelectChangeEvent) => {
    dispatch(setType({ id: focusId, questionType: e.target.value }));
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

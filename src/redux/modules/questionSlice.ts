import { createSlice } from "@reduxjs/toolkit";

export enum QuestionTypes {
  SHORTTEXT = "SHORTTEXT",
  LONGTEXT = "LONGTEXT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  DROPDOWN = "DROPDOWN",
}

export interface QuestionProps {
  id: string;
  questionTitle: string;
  questionType: string;
  contents: string | ItemProps[];
  isRequired: boolean;
}

export interface ItemProps {
  id: string;
  text: string;
}

const createNewquestion = (id: string, questionTitle: string) => {
  return {
    id,
    questionTitle,
    questionType: QuestionTypes.RADIO,
    contents: [{ id: Date.now().toString(), text: "옵션 1" }],
    isRequired: false,
  };
};

const initialState: QuestionProps[] = [];

const questionSlice = createSlice({
  name: "questionSlice",
  initialState: initialState,
  reducers: {
    addQuestion: (state: QuestionProps[], action) => {
      state.push(
        createNewquestion(action.payload.id, action.payload.questionTitle)
      );
    },
  },
});

export const { addQuestion } = questionSlice.actions;
export default questionSlice.reducer;

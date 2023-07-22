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
  questionType: QuestionTypes;
  contents: ItemProps[];
  isRequired: boolean;
}

export interface ItemProps {
  optionId: string;
  text: string;
  isEtc: boolean;
}

const createNewQuestion = (id: string, questionTitle: string) => {
  return {
    id,
    questionTitle,
    questionType: QuestionTypes.RADIO,
    contents: [
      { optionId: Date.now().toString(), text: "옵션 1", isEtc: false },
    ],
    isRequired: false,
  };
};

const createNewOption = (optionId: string, text: string, isEtc: boolean) => {
  return {
    optionId,
    text,
    isEtc,
  };
};

const initialState: QuestionProps[] = [];

const questionSlice = createSlice({
  name: "questionSlice",
  initialState: initialState,
  reducers: {
    addQuestion: (state: QuestionProps[], action) => {
      state.push(
        createNewQuestion(action.payload.id, action.payload.questionTitle)
      );
    },
    setQuestionTitle: (state: QuestionProps[], action) => {
      const target = state.find((card) => card.id === action.payload.id);
      target!.questionTitle = action.payload.questionTitle;
    },
    setQuestionType: (state: QuestionProps[], action) => {
      const target = state.find((card) => card.id === action.payload.id);
      target!.questionType = action.payload.questionType;
    },
    addOption: (state: QuestionProps[], action) => {
      const target = state.find((card) => card.id === action.payload.id);
      target!.contents.push(
        createNewOption(
          action.payload.optionId,
          action.payload.text,
          action.payload.isEtc
        )
      );
    },
    removeOption: (state: QuestionProps[], action) => {
      const target = state.find((card) => card.id === action.payload.id);
      const temp = target!.contents.filter(
        (item) => item.optionId !== action.payload.optionId
      );
      target!.contents = temp;
    },
    setOptionText: (state: QuestionProps[], action) => {
      const target = state.find((card) => card.id === action.payload.id);
      const targetOption = target!.contents.find(
        (item) => item.optionId === action.payload.optionId
      );
      targetOption!.text = action.payload.text;
    },
  },
});

export const {
  addQuestion,
  setQuestionType,
  setQuestionTitle,
  addOption,
  removeOption,
  setOptionText,
} = questionSlice.actions;
export default questionSlice.reducer;

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
  id: string;
  text: string;
  isEtc: boolean;
}

const createNewQuestion = (id: string, questionTitle: string) => {
  return {
    id,
    questionTitle,
    questionType: QuestionTypes.RADIO,
    contents: [{ id: Date.now().toString(), text: "옵션 1", isEtc: false }],
    isRequired: false,
  };
};

const createNewOption = (id: string, text: string, isEtc: boolean) => {
  return {
    id,
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
          action.payload.id,
          action.payload.text,
          action.payload.isEtc
        )
      );
    },
  },
});

export const { addQuestion, setQuestionType, setQuestionTitle, addOption } =
  questionSlice.actions;
export default questionSlice.reducer;

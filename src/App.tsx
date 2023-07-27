import React from "react";
import { GlobalStyle } from "./style/GlobalStyle";
import { Router } from "./Router";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveQuestion, moveOption } from "./redux/modules/questionSlice";

function App() {
  const dispatch = useDispatch();

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;

    if (source.droppableId === "question") {
      dispatch(
        moveQuestion({
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    } else if (destination.droppableId === source.droppableId) {
      dispatch(
        moveOption({
          id: source.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    }
  };

  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Router />
      </DragDropContext>
    </>
  );
}

export default App;

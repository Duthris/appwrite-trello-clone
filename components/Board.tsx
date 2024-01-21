"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "@/components/Column";

function Board() {
  const { getBoard, board, setBoard, updateTodoInDb } = useBoardStore(
    (state) => state,
  );

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if the item was dropped out from a droppable to outside of it then do nothing
    if (!destination) return;

    // Column drag and drop logic
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const newColumns = new Map(entries);
      setBoard({ ...board, columns: newColumns });
    } else if (type === "card") {
      const columns = Array.from(board.columns);
      const startColumnIndex = columns[Number(source.droppableId)];
      const endColumnIndex = columns[Number(destination.droppableId)];

      const startColumn: Column = {
        id: startColumnIndex[0],
        todos: startColumnIndex[1].todos,
      };

      const endColumn: Column = {
        id: endColumnIndex[0],
        todos: endColumnIndex[1].todos,
      };

      if (!startColumn || !endColumn) return;

      if (source.index === destination.index && startColumn === endColumn)
        return;

      const newTodos = startColumn.todos;
      const [movedTodo] = newTodos.splice(source.index, 1);

      if (startColumn.id === endColumn.id) {
        // Move todo inside the same column
        newTodos.splice(destination.index, 0, movedTodo);
        const newColumn = {
          id: startColumn.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startColumn.id, newColumn);
        setBoard({ ...board, columns: newColumns });
      } else {
        // Move todo between columns
        const endTodos = Array.from(endColumn.todos);
        endTodos.splice(destination.index, 0, movedTodo);
        const newColumns = new Map(board.columns);
        const newColumn = {
          id: startColumn.id,
          todos: newTodos,
        };

        newColumns.set(startColumn.id, newColumn);
        newColumns.set(endColumn.id, { id: endColumn.id, todos: endTodos });

        updateTodoInDb(movedTodo, endColumn.id);

        setBoard({ ...board, columns: newColumns });
      }
    }
  };

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;

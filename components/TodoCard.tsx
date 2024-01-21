"use client";

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import getImageUrl from "@/lib/getImageUrl";
import Image from "next/image";

type TodoCardProps = {
  id: TypedColumn;
  index: number;
  todo: Todo;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  id,
  index,
  todo,
  innerRef,
  draggableProps,
  dragHandleProps,
}: TodoCardProps) {
  const { deleteTodo } = useBoardStore((state) => state);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (todo.image) {
      getImageUrl(todo.image!).then((url) => setImageUrl(String(url)));
    }
  }, [todo]);
  return (
    <div
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTodo(index, todo, id)}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>

      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt={"Task Image"}
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
}

export default TodoCard;

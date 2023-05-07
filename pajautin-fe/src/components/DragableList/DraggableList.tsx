import * as React from "react";

import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import { Workshop } from "../../types/Workshop";
import DraggableListItem from "./DraggableListItem";

export type DraggableListProps = {
  items: Workshop[];
  onDragEnd: OnDragEndResponder;
  onDeleteItem: (item: Workshop) => void;
};

const DraggableList = React.memo(
  ({ items, onDragEnd, onDeleteItem }: DraggableListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <DraggableListItem
                  item={item}
                  index={index}
                  key={item.id}
                  onDelete={() => onDeleteItem(item)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default DraggableList;

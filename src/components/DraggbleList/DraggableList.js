import React from 'react'

import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const DraggableList = ({children, items, changeOrderItems}) => {
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const tasks = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        const itemsOrder = tasks.map((task) => task.id);
        changeOrderItems(tasks, itemsOrder);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);

        result.splice(endIndex, 0, removed);
        return result;
    };
    return (
        <div>
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                // style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {items.map((item, index) => (
                                    <Draggable key={item.draggableId} draggableId={item.draggableId}
                                               index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                // style={getItemStyle(
                                                //     snapshot.isDragging,
                                                //     provided.draggableProps.style
                                                // )}
                                            >
                                                {children(item)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};



export default DraggableList;


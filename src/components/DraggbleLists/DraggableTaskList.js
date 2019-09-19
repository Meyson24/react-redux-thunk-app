import React from 'react'

import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const DraggableTaskList = ({children, onDragEnd, items}) => {
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
                                    {items.map((task, index) => (
                                        <Draggable key={task.draggableId} draggableId={task.draggableId}
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
                                                    {children(task)}
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
    )
};

export default DraggableTaskList
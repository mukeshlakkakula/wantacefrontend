import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragDropContainer = ({ recipes, setRecipes }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedRecipes = [...recipes];
    const [movedRecipe] = reorderedRecipes.splice(result.source.index, 1);
    reorderedRecipes.splice(result.destination.index, 0, movedRecipe);

    setRecipes(reorderedRecipes);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="recipes">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {recipes.map((recipe, index) => (
              <Draggable
                key={recipe._id}
                draggableId={recipe._id}
                index={index}
              >
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {recipe.title}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropContainer;

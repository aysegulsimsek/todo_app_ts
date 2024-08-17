import React, { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaCheckDouble } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { TodoType } from "../types/Types";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../redux/todoSlice";
interface TodoTypes {
  todo: TodoType;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Todo({ todo }: TodoTypes) {
  const { id, content, date } = todo;
  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);

  const dispatch = useDispatch();
  const handleRemoveTodo = () => {
    dispatch(removeTodo(id));
  };
  const handleEditTodo = () => {
    const payload: TodoType = {
      id,
      content: newTodo,
      date,
    };
    dispatch(updateTodo(payload));
    setEditable(false);
  };
  return (
    <div className="todo_section_alt">
      {editable ? (
        <div>
          <input
            className="input_todo"
            type="text"
            value={newTodo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTodo(e.target.value)
            }
          />
        </div>
      ) : (
        <div>
          {content}
          <div style={{ fontSize: "10px" }}> {date}</div>
        </div>
      )}

      <div>
        <IoIosRemoveCircleOutline
          className="icons"
          onClick={handleRemoveTodo}
          style={{ color: "red" }}
        />
        {editable ? (
          <FaCheckDouble
            className="icons"
            onClick={handleEditTodo}
            style={{ color: "green" }}
          />
        ) : (
          <FaUserEdit
            className="icons icons_edit"
            onClick={() => setEditable(true)}
            style={{ color: "gold" }}
          />
        )}
      </div>
    </div>
  );
}

export default Todo;

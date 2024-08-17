import React, { useState } from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import { TodoType } from "../types/Types";
import { RootState } from "../redux/store";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todo);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedTodos = todos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Stack spacing={2} className="todo_list_top">
      <div className="todo_list_section">
        <i>
          <h4>To Do List</h4>
        </i>
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map((todo: TodoType) => (
            <Todo key={todo.id} todo={todo} />
          ))
        ) : (
          <p className="todo_section_default">To do 1 </p>
        )}
      </div>
      <Pagination
        count={Math.ceil(todos.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}

export default TodoList;

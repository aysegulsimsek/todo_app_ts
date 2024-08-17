import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoInitialState, TodoType } from "../types/Types";

interface TodoState extends TodoInitialState {
  selectedDates: string[]; // Seçili tarihleri saklayacak bir state
}

const initialState: TodoState = {
  todos: [],
  selectedDates: [], // Başlangıçta boş bir dizi
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const confirmed = confirm("Silmek istediğinize emin misiniz?");
      if (confirmed) {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      }
    },
    updateTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos = state.todos.map((todo) =>
        todo.id !== action.payload.id ? todo : action.payload
      );
    },
    addSelectedDate: (state, action: PayloadAction<string>) => {
      if (!state.selectedDates.includes(action.payload)) {
        state.selectedDates.push(action.payload); // Tarih zaten yoksa ekle
      }
    },
    removeSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDates = state.selectedDates.filter(
        (date) => date !== action.payload
      ); // Tarihi sil
    },
    clearSelectedDates: (state) => {
      state.selectedDates = []; // Tüm seçili tarihleri temizle
    },
  },
});

export const {
  createTodo,
  removeTodo,
  updateTodo,
  addSelectedDate,
  removeSelectedDate,
  clearSelectedDates,
} = todoSlice.actions;

export default todoSlice.reducer;

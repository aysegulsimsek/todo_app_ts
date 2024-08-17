import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TodoType } from "../types/Types";
import { createTodo } from "../redux/todoSlice";
import DatePicker from "../components/DatePicker"; // Takvim bileşeni
import dayjs, { Dayjs } from "dayjs";

function TodoCreate() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const handleCreateTodo = () => {
    if (newTodo.trim().length === 0) {
      alert("To-do giriniz!!");
      return;
    }
    if (!selectedDate) {
      alert("Tarih seçiniz!!");
      return;
    }

    const payload: TodoType = {
      id: Math.floor(Math.random() * 99999999),
      content: newTodo,
      date: selectedDate,
    };

    // To-do eklendiğinde seçilen tarihi selectedDates listesine ekleyin
    setSelectedDates((prevDates) =>
      prevDates.includes(selectedDate)
        ? prevDates
        : [...prevDates, selectedDate]
    );

    dispatch(createTodo(payload));
    setNewTodo("");
    setSelectedDate(null);
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
    }
  };

  return (
    <div className="todo-create">
      <div className="create_collapse">
        <input
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
          className="todo-input"
          type="text"
          placeholder="To-do giriniz."
        />
        <div className="dateTimePicker">
          <DatePicker
            onDateChange={handleDateChange}
            selectedDates={selectedDates} // Takvimde ikonları göstermek için selectedDates kullanılır
          />
        </div>
      </div>

      <button onClick={handleCreateTodo} className="todo_btn">
        Oluştur
      </button>
    </div>
  );
}

export default TodoCreate;

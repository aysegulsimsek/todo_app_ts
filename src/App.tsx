import "./App.css";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="root_top">
      <div className="root">
        <TodoCreate />
      </div>
      <TodoList />
    </div>
  );
}

export default App;

import './App.css';
import input from "./input";
import addBtn from "./addBtn";
import toDoList from "./list";
import adding from "./adding";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>toDo list</p>
      </header>
        {input()}{addBtn(adding())}
        {toDoList()}
    </div>
  );
}

export default App;

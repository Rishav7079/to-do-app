 import './App.css';
 import { Provider } from 'react-redux';
import TodoList from './component/TodoList';
import store from './store';
import AddTodoForm from './component/AddTodoForm';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <h1>To-do List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  </Provider>
  );
}

export default App;

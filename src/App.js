// import Counter from './Counter';
// import Dropdown from './Dropdown';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import TodoEdition from './TodoEditor/TodoEditor';
import React, { Component } from 'react';
// import ColorPicker from './ColorPicker';
import TodoList from './TuduList/TodoList';
import initialTodos from './todos.json';
import './App.css';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    console.log('todoId');

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === todoId) {
          console.log('Нашли тот туду который нужно!');
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  };
  // model.id = nanoid()
  addTodo = text => {
    const todo = {
      id: nanoid(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  changFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  normalizedFilter = this.state.filter.toLowerCase();

  visibleTodos = this.state.todos.filter(todo =>
    todo.text.toLowerCase().includes(this.normalizedFilter)
  );

  render() {
    const { todos, filter } = this.state;

    const totalTodo = todos.length;
    const completTodo = todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0
    );

    return (
      <div>
        <h1>Состояние компонента </h1>
        <div>
          <p>Общее колич-во: {totalTodo}</p>
          <p>Количество выполненных:{completTodo} </p>
        </div>
        <TodoEdition onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changFilter} />
        {/* <label>
          Фильтер по имени
          <input type="text" value={filter} onChange={this.changFilter} />
        </label> */}

        <TodoList
          todos={todos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        {/* <ColorPicker options={colorPickerOptions} /> */}
        {/* <Counter initValue={7} /> */}
        {/* <Dropdown /> */}
      </div>
    );
  }
}

export default App;

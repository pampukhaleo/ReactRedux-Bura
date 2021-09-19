import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItemForm from '../add-item-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all' //active, all, done
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      //find element by index
      const index = todoData.findIndex((elem) => elem.id === id)

      const newArray = [
        ...todoData.slice(0, index), 
        ...todoData.slice(index + 1)
      ]

      return {
        todoData: newArray
      }
    })
  }

  addItem = (text) => {
    //generate new ID
    const newItem = this.createTodoItem(text)

    //add element in array
    this.setState(({ todoData }) => {

      const newArr = [
        ...todoData,
        newItem
      ]

      return {
        todoData: newArr
      }
    })
  }
  
  toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex((elem) => elem.id === id)

      // update obj
      const oldItem = arr[index]
      const newItem = { ...oldItem, 
        [propName]: !oldItem[propName] }

      // construct new arr
      return [
        ...arr.slice(0, index), 
        newItem,
        ...arr.slice(index + 1)
      ]
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
    // console.log('Toggle Done', id)
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  search(items, term) {

    if(term.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  filter(items, filter) {

    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
        
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter)

    const doneCount = todoData
      .filter((el) => el.done).length;                       
    const todoCount = todoData.length - doneCount;

    return (
        <div className="todo-app">
          <AppHeader toDo={ todoCount } done={ doneCount } />
          <div className="top-panel d-flex">
            <SearchPanel 
              onSearchChange={ this.onSearchChange } />
            <ItemStatusFilter 
              filter={ filter }
              onFilterChange= { this.onFilterChange } />
          </div>
    
          <TodoList 
            todos={ visibleItems }
            onDeleted={ this.deleteItem }
            onToggleImportant={ this.onToggleImportant }
            onToggleDone={ this.onToggleDone }
          />

          <div className="bottom-panel">
            <AddItemForm addItem={this.addItem}/>
          </div>
        </div>
      );
    };
  }
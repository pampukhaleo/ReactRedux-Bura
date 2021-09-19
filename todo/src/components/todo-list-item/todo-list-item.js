import React, {Component} from 'react';
import './todo-list-item.css';

//Классы
export default class TodoListItem extends Component {

  // state = {
  //   done: false,
  //   important: false
  // }

  //принимаем state в его последней версии, так как setState асинхронен
  // onLabelClick = () => {
  //     this.setState((state) => {
  //       return {
  //         done: !state.done
  //       };
  //     })
  // }

  //деструктуризация необходимыого свойства с стейта
  // onMarkImportant = () => {
  //   this.setState(({important}) => {
  //     return {
  //       important: !important
  //     }
  //   })
  // }
  
  render() {

    const { label, 
      onDeleted, 
      onToggleImportant, 
      onToggleDone, 
      done, 
      important } = this.props;

    let classNames = 'todo-list-item'
    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }
  
    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          onClick={ onToggleDone } >
            {label}
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={ onToggleImportant } >
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={ onDeleted }>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  };
}

//Функция
// const TodoListItemFunc = ({ label, important = false }) => {

//   const style = {
//     color: important ? 'steelblue' : 'black',
//     fontWeight: important ? 'bold' : 'normal'
//   };

//   return (
//     <span className="todo-list-item">
//       <span
//         className="todo-list-item-label"
//         style={style}>
//         {label}
//       </span>

//       <button type="button"
//               className="btn btn-outline-success btn-sm float-right">
//         <i className="fa fa-exclamation" />
//       </button>

//       <button type="button"
//               className="btn btn-outline-danger btn-sm float-right">
//         <i className="fa fa-trash-o" />
//       </button>
//     </span>
//   );
// };

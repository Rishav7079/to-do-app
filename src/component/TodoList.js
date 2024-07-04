// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, updateTodo, deleteTodo } from '../reducer/todoSlice';
import styles from '../css/TodoList.module.css';
 

const TodoList = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.todos);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchTodos());
      }
    }, [status, dispatch]);
  
    const handleEdit = (todo) => {
      setEditingId(todo.id);
      setEditTitle(todo.title);
    };
  
    const handleSave = (id) => {
      dispatch(updateTodo({ id, title: editTitle, completed: false }));
      setEditingId(null);
      setEditTitle('');
    };
  
    const handleDelete = (id) => {
      dispatch(deleteTodo(id));
    };
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    return (
      <ul className={styles.todoList}>
        {items.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            {editingId === todo.id ? (
              <div className={styles.todoContent}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={styles.input}
                />
                <button onClick={() => handleSave(todo.id)} className={styles.button}>
                  Save
                </button>
              </div>
            ) : (
              <div className={styles.todoContent}>
                <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
                  {todo.title}
                </span>
                <div className={styles.buttonContainer}>
                  <button onClick={() => handleEdit(todo)} className={styles.button}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(todo.id)} className={`${styles.button} ${styles.deleteButton}`}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  export default TodoList;
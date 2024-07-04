import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../reducer/todoSlice";
import styles from "../css/AddTodoForm.module.css";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTodo({ title, completed: false }));
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        placeholder="Add a new to-do"
      />
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;

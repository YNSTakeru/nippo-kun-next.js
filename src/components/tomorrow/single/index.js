import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../../todoSlice";
import "./index.css";

export default function MultiTextarea({ title, placeholder }) {
  const [content, setContent] = useState("");
  const todos = useSelector((state) => state.todo.tomorrow);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  const handleAddTextarea = () => {
    if(content.trim()) {
      dispatch(addTodo(content));
      setContent("");
    }
  };

    useEffect(() => {
      const textarea  = textareaRef.current;
      const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.isComposing) {
          if (event.metaKey) {
            event.preventDefault();
            handleAddTextarea();
          }
        }
      };

      if (textarea) {
        textarea.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        if (textarea) {
          textarea.removeEventListener("keydown", handleKeyDown);
        }
      };
    }, [handleAddTextarea]);

  return (
    <div>
      <h2 className="multi__title">{title}</h2>
      <div className="multi__textarea__wrapper">
        <textarea
          ref={textareaRef}
          className="multi__textarea"
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="multi__button add" onClick={handleAddTextarea}>
          ＋
        </button>
      </div>
    </div>
  );
}

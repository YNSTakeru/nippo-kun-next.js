"use client";

import { useEffect, useState } from "react";
import "./index.css";

function Header() {
  const [beforeTasks, setBeforeTasks] = useState([
    "タスクを読み込んでいます...",
  ]);

  // const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem("yesterday")) {
      const testTasks = ["タスクがありません"];
      localStorage.setItem("yesterday", JSON.stringify(testTasks));
      setBeforeTasks(testTasks);
      return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("yesterday"));
    setBeforeTasks(storedTasks);
  }, []);

  return (
    <header className="header">
      <h1 className="header-title">にっぽーくん</h1>
      <nav className="header-nav">
        <h3>前回立てた予定</h3>
        <ul>
          {beforeTasks && beforeTasks.length > 0 ? (
            beforeTasks.map((task, index) => <li key={index}>{task}</li>)
          ) : (
            <li>前回の立てた予定がありません</li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

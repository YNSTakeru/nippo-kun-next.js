"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeDoneName } from "../../redux/store/modules/doneName";
import {
  setDate,
  setLearningTime,
  setMind,
} from "../../redux/store/modules/metaData";
import {
  change,
  editDoneName,
  remove,
} from "../../redux/store/modules/pdcaList";
import "./index.css";
import Tabs from "./tab";

function MetaData() {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("");
  const [tabs, setTabs] = useState([]);
  const [isToday, setIsToday] = useState(true);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekday = today.toLocaleDateString("ja-JP", { weekday: "short" });
    dispatch(setDate(`${month}/${day}(${weekday})`));
    return `${month}/${day}`;
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return today.getMonth() + 1;
  });

  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    return today.getDate();
  });

  const [selectedHour, setSelectedHour] = useState(null);

  const [selectedMind, setSelectedMind] = useState(null);

  const [dayOfWeek, setDayOfWeek] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString("ja-JP", { weekday: "short" });
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedHour = localStorage.getItem("defaultStudyHour");
    dispatch(setLearningTime(savedHour || 10));
    setSelectedHour(savedHour || 10);

    const savedMind = localStorage.getItem("defaultTodayMind");
    dispatch(setMind(savedMind || "まあまあ"));
    setSelectedMind(savedMind || "まあまあ");

    const storedTabs = localStorage.getItem("yesterday")
      ? JSON.parse(localStorage.getItem("yesterday"))
      : [];
    setTabs(storedTabs);
    if (storedTabs.length > 0) {
      setCurrentTab(storedTabs[0]);
    }

    const days = Array.from({ length: 12 }, (_, i) =>
      new Date(2022, i + 1, 0).getDate()
    );
    setDaysInMonth(days);
  }, []);

  const handleUpdateTask = (index, content) => {
    const updatedTabs = tabs.map((tab, i) => (i === index ? content : tab));
    setTabs(updatedTabs);
  };

  const handleRemoveTab = (tabName) => {
    if (tabs.length === 1) return;
    const updatedTabs = tabs.filter((tab) => tab !== tabName);
    setTabs(updatedTabs);
    setCurrentTab(updatedTabs[0]);
    setCurrentTab(updatedTabs[0]);
    dispatch(changeDoneName({ doneName: updatedTabs[0] }));
    dispatch(change({ doneName: updatedTabs[0] }));
    dispatch(remove({ doneName: tabName }));
  };

  const handleEditTab = () => {
    const newLabel = prompt("タスクを入力してください:", currentTab);

    if (newLabel && !tabs.includes(newLabel)) {
      handleUpdateTask(tabs.indexOf(currentTab), newLabel);
      dispatch(
        editDoneName({ prevDoneName: currentTab, newDoneName: newLabel })
      );
      dispatch(changeDoneName({ doneName: newLabel }));
      setCurrentTab(newLabel);
    }
  };

  const handleDateChange = (month, day) => {
    const date = new Date(new Date().getFullYear(), month - 1, day);
    const weekday = date.toLocaleDateString("ja-JP", { weekday: "short" });
    setCurrentDate(`${month}月${day}日(${weekday})`);
    setSelectedMonth(month);
    setSelectedDay(day);
    setDayOfWeek(weekday);
    dispatch(setDate(`${month}月${day}日(${weekday})`));
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    handleDateChange(newMonth, selectedDay);
  };

  const handleDayChange = (e) => {
    const newDay = e.target.value;
    handleDateChange(selectedMonth, newDay);
  };

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    setSelectedHour(newHour);
    dispatch(setLearningTime(newHour));
    localStorage.setItem("defaultStudyHour", newHour);
  };

  const handleMindChange = (e) => {
    const newMind = e.target.value;
    setSelectedMind(newMind);
    dispatch(setMind(newMind));
    localStorage.setItem("defaultTodayMind", newMind);
  };

  const handleTabChange = (tabName) => {
    setCurrentTab((prev) => tabName);
  };

  const toggleDropdown = (id) => {
    const dropdown = document.getElementById(id);
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  };

  return (
    <>
      <div className="MetaData">
        <div className="date">
          <div>日付:</div>
          <span
            className="currentDate"
            onClick={() => toggleDropdown("dateDropdown")}
          >
            {currentDate}
          </span>
          <div id="dateDropdown" className="dropdown">
            <select value={selectedMonth} onChange={handleMonthChange}>
              {[...Array(12).keys()].map((m) => (
                <option key={m + 1} value={m + 1}>
                  {m + 1}月
                </option>
              ))}
            </select>
            <select value={selectedDay} onChange={handleDayChange}>
              {[...Array(31).keys()].map((d) => (
                <option key={d + 1} value={d + 1}>
                  {d + 1}日
                </option>
              ))}
            </select>
          </div>
          <button
            className="yesterday-change-button"
            onClick={() => {
              setIsToday((prev) => !prev);
              if (isToday) {
                const day =
                  +selectedDay === 1
                    ? daysInMonth[+selectedMonth - 1]
                    : +selectedDay - 1;

                let month =
                  +selectedDay === 1 ? selectedMonth - 1 : +selectedMonth;

                if (month === 0) {
                  month = 12;
                }

                console.log(month, day);

                handleDateChange(month, day);
              } else {
                const today = new Date();
                handleDateChange(today.getMonth() + 1, today.getDate());
              }
            }}
          >
            {isToday ? "昨日" : "今日"}に変更
          </button>
        </div>
        <div className="time">
          <div>学習時間</div>
          <span
            className="learningTime"
            onClick={() => toggleDropdown("timeDropdown")}
          >
            {selectedHour && `${selectedHour}時間`}
          </span>
          <select
            id="timeDropdown"
            className="dropdown"
            value={selectedHour || ""}
            onChange={handleHourChange}
          >
            {[...Array(25).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour}時間
              </option>
            ))}
          </select>
        </div>
        <div className="mind">
          <div>今日の気持ち</div>
          <span
            className="selectedMind"
            onClick={() => toggleDropdown("mindDropdown")}
          >
            {selectedMind ? selectedMind : "読み込み中..."}
          </span>
          <select
            id="mindDropdown"
            className="dropdown"
            value={selectedMind || ""}
            onChange={handleMindChange}
          >
            {["めちゃええ", "ええ", "まあまあ", "わるい", "めちゃわるい"].map(
              (value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setTabs={setTabs}
        onTabChange={handleTabChange}
        handleRemoveTab={handleRemoveTab}
        handleEditTab={handleEditTab}
      />
    </>
  );
}

export default MetaData;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeDoneName } from "../../../redux/store/modules/doneName";
import { add, change } from "../../../redux/store/modules/pdcaList";
import "./index.css";

const Tabs = ({
  tabs,
  currentTab,
  setTabs,
  onTabChange,
  handleRemoveTab,
  handleEditTab,
}) => {
  const [activeTab, setActiveTab] = useState(currentTab);
  const dispatch = useDispatch();
  const [isReadTags, setIsReadTags] = useState(false);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  useEffect(() => {
    if (isReadTags) return;
    if (tabs.length > 0) {
      for (let i = 0; i < tabs.length; i++) {
        dispatch(add({ doneName: tabs[i] }));
      }
      dispatch(changeDoneName({ doneName: tabs[0] }));
      dispatch(change({ doneName: tabs[0] }));
      setIsReadTags(true);
    }
  }, [tabs]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    onTabChange(tabName);
    dispatch(change({ doneName: tabName }));
    dispatch(changeDoneName({ doneName: tabName }));
  };

  const handleAddTab = () => {
    const newTab = prompt("新しいタスクを入力してください:");

    if (newTab && !tabs.includes(newTab)) {
      setTabs((prev) => [...prev, newTab]);
      setActiveTab((prev) => newTab);
      onTabChange(newTab);
      dispatch(add({ doneName: newTab, isOpen: true }));
      dispatch(changeDoneName({ doneName: newTab }));
      dispatch(change({ doneName: newTab }));
    } else {
      alert("同じタスク名は登録できません。");
    }
  };

  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab-button ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
      <button className="add-tab" onClick={handleAddTab}>
        +
      </button>
      {activeTab && (
        <>
          <div className="task-controls">
            <button className="edit" onClick={handleEditTab}></button>
            <button
              className="remove"
              onClick={() => handleRemoveTab(activeTab)}
            ></button>
          </div>
        </>
      )}
    </div>
  );
};

export default Tabs;

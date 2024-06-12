import React, { useState } from "react";
import Digression from "./digression";
import Help from "./help";
import "./index.css";

export default function DigressionAndHelp() {
  const [activeTab, setActiveTab] = useState('digression')

  return (
    <>
      <div className="tab__wrapper">
        <h2
        className={`tab__title ${activeTab === 'digression' ? 'active' : ''}`}
        onClick={() => setActiveTab('digression')}
        >
          余談
        </h2>
        <h2
        className={`tab__title ${activeTab === 'help' ? 'active' : ''}`}
        onClick={() => setActiveTab('help')}
        >
          相談
        </h2>
      </div>
      <div className="content__wrapper">
        {activeTab === 'digression' && <Digression />}
        {activeTab === 'help' && <Help />}
      </div>
    </>
  );
}

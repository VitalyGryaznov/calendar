import React from "react";
import "./App.scss";
import AppContent from "./components/content/Content";
import AppHeader from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <div className="App_container">
        <AppHeader />
        <AppContent />
      </div>
    </div>
  );
}

export default App;

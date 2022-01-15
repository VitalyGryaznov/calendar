import React from "react";
import "./Header.scss";

function Header() {
  return (
    <div>
      <div className="header_container" data-testid="header">
        <h1 className="header_title">Calendar</h1>
      </div>
    </div>
  );
}

export default Header;

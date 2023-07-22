import React from "react";
import { Link } from "react-router-dom";

const HeaderSection = () => {
  return (
    <div>
      <header>
        <Link className="links" to="/">
          Menu
        </Link>
        <Link className="links" to="/">
          Career
        </Link>
      </header>
    </div>
  );
};
export default HeaderSection;

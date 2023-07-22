import React from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import HeaderSection from "./Header/HeaderSection";

const App = () => {
  return (
    <BrowserRouter>
      <HeaderSection />
      <h1>McDonalds</h1>
      <h2>What?</h2>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

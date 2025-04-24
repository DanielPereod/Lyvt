import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import { BrowserRouter, Route, Routes } from "react-router";

import Home from "./pages/Home";
import React from "react";
import Layout from "./components/layout";
import Workout from "./pages/Workout";
import CreateExercise from "./pages//Exercise/CreateExercise";
import EditExercise from "./pages//Exercise/EditExercise";


const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
createRoot(rootElement).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout/:id" element={<Workout />} />
        <Route path="/exercise" element={<CreateExercise />} />
        <Route path="/exercise" element={<CreateExercise />} />
        <Route path="/exercise/:id" element={<EditExercise/>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Sightings from "./Sightings";

const App = () => (
  <main>
    <nav>
      <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </main>
);

const Home = () => (
  <>
    <h1>{process.env.REACT_APP_TITLE}</h1>
    <h2>{process.env.REACT_APP_SUBTITLE}</h2>
    <Sightings />
  </>
);

const Dashboard = () => (
  <>
    <h1>Dashboard</h1>
  </>
);

export default App;

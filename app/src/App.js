import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Sightings from "./Sightings";

const App = () => (
  <main>
    <nav>
      <Link to="/">Sightings</Link> |
      <Link to="database">Endangered Species Database</Link>
    </nav>
    <Routes>
      <Route path="/" element={<ListOfSightings />} />
      <Route path="/database" element={<Database />} />
    </Routes>
  </main>
);

const ListOfSightings = () => (
  <>
    <h1>{process.env.REACT_APP_TITLE}</h1>
    <h2>{process.env.REACT_APP_SUBTITLE}</h2>
    <Sightings />
  </>
);

const Database = () => (
  <>
    <h1>Endangered Species Database</h1>
  </>
);

export default App;

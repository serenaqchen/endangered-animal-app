import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";


import Sightings from "./Sightings";
import Species from "./Species";

const App = () => (
  <main>
    <nav>
      <Link to="/">Sightings</Link> |
      <Link to="individuals">Individually Tracked Animals</Link> |
      <Link to="species">Endangered Species Database</Link>
    </nav>
    <Routes>
      <Route path="/" element={<ListOfSightings />} />
      <Route path="/individuals" element={<ListOfIndividuals />} />
      <Route path="/species" element={<ListOfSpecies />} />
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

const ListOfIndividuals = () => (
  <>
    <h1>Individually Tracked Animals</h1>
  </>
);

const ListOfSpecies = () => (
  <>
    <h1>Endangered Species Database</h1>
    <Species />
  </>
);

export default App;

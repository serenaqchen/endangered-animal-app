import * as React from "react";

import * as apiClient from "./apiClient";

function Species() {
  const [species, setSpecies] = React.useState([]);

  const loadSpecies = async () =>
    setSpecies(
      await apiClient.getSpecies().then((data) => {
        return apiClient.formatDateandTime(data);
      }),
    );

  // const addSpecies = (newSighting) => {
  //   apiClient.addSpecies(newSighting).then(loadSpecies);
  // };

  React.useEffect(() => {
    loadSpecies();
  }, []);

  return (
    <section>
      <SpeciesList species={species} />
      {/* <AddSpecies addSpecies={addSpecies} /> */}
    </section>
  );
};

//this is my SpeciesList component
const SpeciesList = ({ species }) => (
  <div>
    <h2>Species</h2>
    <ul>
      {species.map((specie, index) => (
        <li key={index}>
          Common Name:{specie.common_name} <br />
          Scientific Name:{specie.scientific_name} <br />
          Population: {specie.population}<br />
          Status Code: {specie.status_code} <br />
          <img src={specie.image_url} alt={specie.common_name}></img>
        </li>
      ))}
    </ul>
  </div>
);

export default Species

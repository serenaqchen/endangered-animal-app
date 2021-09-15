import * as React from "react";

import * as apiClient from "./apiClient";

const Sightings = () => {
  const [sightings, setSightings] = React.useState([]);

  const loadSightings = async () =>
    setSightings(await apiClient.getSightings());
    console.log(sightings);
  // const addSighting = (sighting) => apiClient.addSighting(sighting).then(loadSightings);

  React.useEffect(() => {
    loadSightings();
  }, []);

  return (
    <section>
      <SightingList sightings={sightings} />
      {/* <AddSighting {...{ addsighting }} /> */}
    </section>
  );
};

const SightingList = ({ sightings }) => (
  <div>
    <h2>Sightings</h2>
    <ul>
      {sightings.map((sighting, index) => (
        <li key={index}>
          {sighting.nick_name} the {sighting.common_name} ({sighting.scientific_name}) <br/> 
          Spoted on: {sighting.sighting_date} @ {sighting.sighting_time}
        </li>
      ))}
    </ul>
  </div>
);

// const AddSighting = ({ addsighting }) => {
//   const [sighting, setSighting] = React.useState("");

//   const canAdd = sighting !== "";

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (canAdd) {
//       addSighting(sighting);
//       setSighting("");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <label>
//         New sighting:{" "}
//         <input onChange={(e) => setSighting(e.currentTarget.value)} value={sighting} />
//       </label>
//       <button disabled={!canAdd}>Add</button>
//     </form>
//   );
// };

export default Sightings;

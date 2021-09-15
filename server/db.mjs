import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getSightings = () => db.any("SELECT sightings.common_name, sightings.scientific_name, sightings.sighting_date, sightings.sighting_time, individuals.nick_name FROM sightings LEFT JOIN individuals ON sightings.sighting_id = individuals.individual_id");

// export const addSighting = (common_name) =>
//   db.one("INSERT INTO sightings(common_name) VALUES(${name}) RETURNING *", {common_name});

// db.one("INSERT INTO sightings(individual_id, common_name, scientific_name, sighting_date, sighting_time) VALUES(${name}, ${individual_id}, ${common_name}, ${scientific_name}, ${sighting_date}, ${sighting_time}) RETURNING *", { newSighting.individual_id, newSighting.common_name, newSighting.scientific_name, newSighting.sighting_date, newSighting.sighting_time});

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}

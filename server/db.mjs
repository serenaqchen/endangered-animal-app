import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getSightings = () => db.any("SELECT individuals.common_name, individuals.scientific_name, sightings.sighting_date, sightings.sighting_time, individuals.nick_name FROM sightings LEFT JOIN individuals ON sightings.individual_id = individuals.individual_id");

//creating a fxn that is going to perform a query to add a row to the sightings database
export const addSighting = (newSighting) =>
  db.one("INSERT INTO sightings(individual_id, sighting_date, sighting_time) VALUES($1, $2, $3) RETURNING *", [newSighting["individual_id"], newSighting["sighting_date"], newSighting["sighting_time"]]);

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

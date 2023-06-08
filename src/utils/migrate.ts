import { pool } from "../config";

async function migrateDB() {
  try {
    console.log("Migrating DB");
    const client = await pool.connect();
    await client.query(
      `
        CREATE TABLE IF NOT EXISTS users (
            id serial primary key,
            username varchar(100) NOT NULL,
            first_name varchar(100),
            last_name varchar(100),
            email varchar(100) NOT NULL,
            phone_number varchar(100),
            location varchar(100),
            password varchar(100) NOT NULL,
            salt varchar(100) NOT NULL,
            created_at timestamp,
            updated_at timestamp
        )
          `
    );

    await client.query(
      `
        CREATE TABLE IF NOT EXISTS posts (
            id serial primary key,
            user_id int NOT NULL,
            body text NOT NULL,
            created_at timestamp,
            deleted_at timestamp,
            CONSTRAINT fk_posts
            FOREIGN KEY(user_id)
            REFERENCES users(id)
        )
          `
    );

    client.release();
    console.log("Migrating completed.");
  } catch (error) {
    console.log(error.message);
  }
}

migrateDB();

import { pool } from "../config";
import { CreateUserRequest } from "../schema";

export const createUser = async (user: CreateUserRequest) => {
  try {
    const client = await pool.connect();
    await client.query(
      `
        INSERT INTO users (username, email, password, salt, created_at) VALUES ($1, $2, $3, $4, $5)
    `,
      [user.username, user.email, user.password, user.salt, user.createdAt]
    );
    client.release();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkUserByUsernameOrEmail = async (
  username: string,
  email: string
) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT id, username, password, salt FROM users WHERE username = $1 or email = $2
    `,
      [username, email]
    );
    client.release();
    return result.rowCount;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserAuth = async (username: string) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT username, password, salt FROM users WHERE username = $1
    `,
      [username]
    );

    client.release();

    if (result.rowCount) {
      return result.rows[0];
    }

    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT username, email, first_name, last_name, phone_number, location, date_trunc('second', created_at) as created_at from users where username = $1
    `,
      [username]
    );

    if (result.rowCount) {
      return result.rows[0];
    }

    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUser = async (cursor: string) => {
  console.log(cursor);
  try {
    const client = await pool.connect();
    let query = `select username, email, first_name, last_name, email, phone_number, location, date_trunc('second', created_at) as created_at from users`;

    if (cursor != "") {
      query += ` where date_trunc('second', created_at) <= '${cursor}'`;
    }

    query += " order by created_at DESC LIMIT 6";
    const result = await client.query(query);

    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getUserById = async () => {};
export const searchUserByUsernameOrEmail = async (
  keyword: string,
  cursor: string
) => {
  try {
    console.log(keyword);
    const client = await pool.connect();
    let query = `select username, email, first_name, last_name, email, phone_number, location, date_trunc('second', created_at) as created_at from users where`;

    if (cursor != "") {
      query += ` date_trunc('second', created_at) <= '${cursor}' and`;
    }
    keyword = `%${keyword}%`;

    query += " username LIKE $1 order by created_at DESC LIMIT 6";
    const result = await client.query(query, [keyword]);

    return result.rows;
  } catch (error) {
    throw new Error("error.message");
  }
};
export const updatePassword = async () => {};
export const updateProfile = async () => {};

import { pool } from "../config";
import {
  CreateUserRequest,
  UpdatePasswordRequest,
  UpdateUserRequest,
} from "../schema";

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
      SELECT id, username, password, salt FROM users WHERE username = $1
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

export const getUserAuthById = async (id: string) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT id, username, password, salt FROM users WHERE id = $1
    `,
      [id]
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
    client.release();
    if (result.rowCount) {
      return result.rows[0];
    }

    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUser = async (cursor: string) => {
  try {
    const client = await pool.connect();
    let query = `select username, email, first_name, last_name, email, phone_number, location, date_trunc('second', created_at) as created_at from users`;

    if (cursor != "") {
      query += ` where date_trunc('second', created_at) <= '${cursor}'`;
    }

    query += " order by created_at DESC LIMIT 6";
    const result = await client.query(query);
    client.release();
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getUserById = async (id: string) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
    select username, email, first_name, last_name, email, phone_number, location, date_trunc('second', created_at) as created_at from users where id = $1
    `,
      [id]
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

export const searchUserByUsernameOrEmail = async (
  keyword: string,
  cursor: string
) => {
  try {
    const client = await pool.connect();
    let query = `select username, email, first_name, last_name, email, phone_number, location, date_trunc('second', created_at) as created_at from users where`;

    if (cursor != "") {
      query += ` date_trunc('second', created_at) <= '${cursor}' and`;
    }
    keyword = `%${keyword}%`;

    query += " username LIKE $1 order by created_at DESC LIMIT 6";
    const result = await client.query(query, [keyword]);
    client.release();
    return result.rows;
  } catch (error) {
    throw new Error("error.message");
  }
};
export const updatePassword = async (
  id: string,
  req: UpdatePasswordRequest
) => {
  try {
    const client = await pool.connect();
    await client.query(
      `
      UPDATE users SET password = $1, updated_at = $2 where id = $3
    `,
      [req.password, req.updatedAt, id]
    );
    client.release();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProfile = async (id: string, req: UpdateUserRequest) => {
  try {
    const client = await pool.connect();
    await client.query(
      `UPDATE users SET 
       first_name = $1, last_name = $2, phone_number = $3, location = $4, updated_at = $5
       where id = $6
       `,
      [
        req.firstName,
        req.lastName,
        req.phoneNumber,
        req.location,
        req.updatedAt,
        id,
      ]
    );
    client.release();
  } catch (error) {
    throw new Error(error.message);
  }
};

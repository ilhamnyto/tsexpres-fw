import { pool } from "../config";
import { CreatePostRequest } from "../schema";

export const createPost = async (req: CreatePostRequest) => {
  try {
    const client = await pool.connect();
    await client.query(
      `
            INSERT INTO posts (user_id, body, created_at) VALUES ($1, $2, $3)
        `,
      [req.user_id, req.body, req.createdAt]
    );

    client.release();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllPost = async (cursor: string) => {
  try {
    const client = await pool.connect();
    let query = `select u.username, p.body, date_trunc('second', p.created_at) as created_at from posts as p left join users as u on u.id = p.user_id`;

    if (cursor != "") {
      query += ` where date_trunc('second', p.created_at) <= '${cursor}'`;
    }

    query += " order by created_at DESC LIMIT 6";
    const result = await client.query(query);
    client.release();
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostById = async (id: string) => {
  try {
    const client = await pool.connect();
    const post = await client.query(
      `
        select p.id, u.username, p.body, date_trunc('second', p.created_at) as created_at from posts as p left join users as u on u.id = p.user_id where p.id = $1
        `,
      [id]
    );
    client.release();

    if (post.rowCount) {
      return post.rows[0];
    }
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostByUserId = async (userId: string, cursor: string) => {
  try {
    const client = await pool.connect();
    let query = `select p.id, u.username, p.body, date_trunc('second', p.created_at) as created_at from posts as p left join users as u on u.id = p.user_id where`;

    if (cursor != "") {
      query += ` date_trunc('second', p.created_at) <= '${cursor}' and`;
    }

    query += " p.user_id = $1 order by p.created_at DESC LIMIT 6";
    const result = await client.query(query, [userId]);
    client.release();
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostByUsername = async (username: string, cursor: string) => {
  try {
    const client = await pool.connect();
    let query = `select p.id, u.username, p.body, date_trunc('second', p.created_at) as created_at from posts as p left join users as u on u.id = p.user_id where`;

    if (cursor != "") {
      query += ` date_trunc('second', p.created_at) <= '${cursor}' and`;
    }

    query += " u.username = $1 order by p.created_at DESC LIMIT 6";
    const result = await client.query(query, [username]);
    client.release();
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const searchPosts = async (keyword: string, cursor: string) => {
  try {
    const client = await pool.connect();
    let query = `select p.id, u.username, p.body, date_trunc('second', p.created_at) as created_at from posts as p left join users as u on u.id = p.user_id where`;

    if (cursor != "") {
      query += ` date_trunc('second', p.created_at) <= '${cursor}' and`;
    }
    keyword = `%${keyword}%`;
    query +=
      " u.username LIKE $1 or p.body LIKE $1 order by p.created_at DESC LIMIT 6";
    const result = await client.query(query, [keyword]);
    client.release();
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

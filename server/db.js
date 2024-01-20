import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getPosts(){
    const [rows] = await pool.query('SELECT * FROM posts')
    return rows
}

export async function getPost(id){
    const [rows] = await pool.query('SELECT * FROM posts WHERE postid = ?', [id])
    return rows
}

export async function getUsers() {
    const [rows] = await pool.query('SELECT * FROM users')
    return rows
}

export async function getUser(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE userid = ?', [id])
    return rows
}

export async function getUsersAndPosts() {
    const [rows] = await pool.query(
        `SELECT users.userid, users.username, posts.postid, posts.content 
        FROM users 
        INNER JOIN posts 
        ON users.userid = posts.userid
        ORDER BY postid DESC`)
    return rows
}

export async function getPostFromUser(userid, postid){
    const [rows] = await pool.query(`
    SELECT users.userid, users.username, posts.postid, posts.content
    FROM users
    INNER JOIN posts
    ON users.userid = ?
    AND posts.postid = ?
    AND posts.userid = users.userid`, [userid, postid])
    return rows
}

export async function getPostsFromUser(userid) {
    const [rows] = await pool.query(`
    SELECT users.userid, users.username, posts.postid, posts.content
    FROM users
    INNER JOIN posts
    ON users.userid = ?
    AND posts.userid = users.userid`, [userid])
    return rows
}

export async function createUser(username, password, description) {
    await pool.query(
        `INSERT INTO users VALUES(
            null,
            ?,
            ?,
            ?
        )`, [username, password, description])
}

export async function createPost(userid, content) {
    await pool.query(
        `INSERT INTO posts VALUES(
            null,
            ?,
            ?
        )`, [userid, content])
}

export async function deleteUser(id) {
    await pool.query(`
    DELETE FROM users
    WHERE userid = ?`, [id])
}

export async function deletePost(id) {
    await pool.query(`
    DELETE FROM posts
    WHERE postid = ?`, [id])
}
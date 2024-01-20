import express from "express";
import { getPosts, getUsers, getUsersAndPosts, getUser, getPost, getPostsFromUser, 
        getPostFromUser, createPost, createUser, deletePost, deleteUser } from "../db.js";

const router = express.Router()

router.get('/', async (req, res) => {
    const data = await getUsersAndPosts()
    res.status(200).send(data)
})

router.get('/users', async (req, res) => {
    const data = await getUsers()
    res.status(200).send(data)
})

router.get('/posts', async (req, res) => {
    const data = await getPosts()
    res.status(200).send(data)
})

router.get('/users/:id', async (req, res) => {
    const {id} = req.params
    const data = await getUser(id)
    res.status(200).send(data)
})

router.get('/posts/:id', async (req, res) => {
    const {id} = req.params
    const data = await getPost(id)
    res.status(200).send(data)
})

router.get('/users/:id/posts', async (req, res) => {
    const {id} = req.params

    const data = await getPostsFromUser(id)
    res.send(data)
})

router.get('/users/:userid/posts/:postid', async (req, res) => {
    const {userid, postid} = req.params

    const data = await getPostFromUser(userid, postid)
    res.send(data)
})

router.post('/users', async (req, res) => {
    const {username, password} = req.body

    await createUser(username, password)
    res.status(200).send('Usuário criado com sucesso!')
})

router.post('/posts', async (req, res) => {
    const {userid, content} = req.body

    await createPost(userid, content)
    res.status(200).send('Post criado!')
})

router.delete('/users/:id', async (req, res) => {
    const {id} = req.params

    await deleteUser(id)
    res.status(200).send('Usuário deletado com sucesso!')
})

router.delete('/posts/:id', async (req, res) => {
    const {id} = req.params
    
    await deletePost(id)
    res.status(200).send('Post deletado com sucesso!')
})

export default router
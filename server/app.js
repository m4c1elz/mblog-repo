import express from 'express'
import cors from 'cors'
import router from './routes/router.js'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json({urlencoded: true}))
app.use('/api', router)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
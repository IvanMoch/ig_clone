import { createServer } from 'http'
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { postRouter } from './routes/post.routes.js'
import { userRouter } from './routes/users.routes.js'
import { messageRouter } from './routes/message.routes.js'
import { likesRouter } from './routes/likes.routes.js'
import { commentRouter } from './routes/comment.routes.js'
import { followerRouter } from './routes/followers.routes.js'


const app = express()
const server = createServer(app)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to instagram clone!')
})

app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)
app.use('/api/likes', likesRouter)
app.use('/api/comments', commentRouter)
app.use('/api/followers', followerRouter)



server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

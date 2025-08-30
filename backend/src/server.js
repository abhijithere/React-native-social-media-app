import express from 'express'
import { ENV } from './config/env.js'
import { connectDB } from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import notificationRoutes from './routes/notification.route.js'
import { arcjetMiddleware } from './middleware/arcjet.middleware.js'




const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(arcjetMiddleware)


app.get("/", (req, res) => {
    res.status(200).json({
        message: "hello from server"
    })

})

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/notification",notificationRoutes)





const startServer = async () => {
    try {
        await connectDB();

        if(ENV.NODE_ENV !== "production"){

            app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));
        }
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();



export default app
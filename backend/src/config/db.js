import mongoose from 'mongoose'
import { ENV } from './env.js'

export const connectDB = async()=>{
    try {
        await mongoose.connect(ENV.MONGO_URI)
        console.log('Connected to db')
    } catch (error) {
        console.log("error connecting to mongodb")
        process.exit(1)     
    }
}
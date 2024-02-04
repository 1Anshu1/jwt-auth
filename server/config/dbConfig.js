import mongoose from 'mongoose';

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error in connecting to database'))
}

export default dbConnect;
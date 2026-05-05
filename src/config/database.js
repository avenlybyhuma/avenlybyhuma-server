let cachedPromise = null;

const connectDB = async () => {
    if (cachedPromise) {
        return cachedPromise;
    }

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        cachedPromise = mongoose.connect(process.env.MONGODB_URI, {
            // Options to improve connection stability and speed
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        const conn = await cachedPromise;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        cachedPromise = null;
        console.error(`Database Connection Error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;

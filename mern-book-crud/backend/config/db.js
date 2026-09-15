import dns from "dns";
import mongoose from "mongoose";

// Set reliable public DNS servers for MongoDB SRV resolution (fixes ECONNREFUSED on local networks)
try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
    // Ignore if setServers fails
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected to Atlas Successfully");
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);

        process.exit(1);
    }
};

export default connectDB;
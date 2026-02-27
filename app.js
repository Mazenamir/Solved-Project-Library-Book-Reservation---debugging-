require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());
// app.use(express.urlencoded());

// Maker the DataBase connection with ASync / AWAIt
async function connectDB() {
    if (mongoose.connection.readyState >= 1) {  
        console.log('MongoDB done');
        return;
    }
    try {
        await mongoose.connect('mongodb://localhost:27017/library');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB() ; // define the connection function


app.use("/api", bookRoutes);

// Port hardcoded as 3000 
// Used process.env.PORT with fallback


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


































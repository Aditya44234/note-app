require('dotenv').config();

const app=require('./app.js');
const connectDB=require('./config/db');

const PORT=process.env.PORT || 3000;

// Connect to Database
connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
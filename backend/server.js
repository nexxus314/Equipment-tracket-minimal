const express = require("express");
const cors = require("cors")
const equipmentRoutes = require("./routes/equipmentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/equipment",equipmentRoutes);

const PORT = 6000;
app.listen(PORT,()=>{
    console.log(`server up and running on port ${PORT}`)
})
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4:uuidv4 }=require("uuid");



const router = express.Router();
const dataPath = path.join(__dirname,"../data/equipment.json");

const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData =(data)=> fs.writeFileSync(dataPath,JSON.stringify(data,null,2));


router.get("/",(req,res)=>{
    const data =readData();
    res.json(data)
})

router.post("/",(req,res)=>{
    const data = readData();
    const newItem = { id: uuidv4(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);

});


router.put("/:id",(req,res) =>{
    const data = readData();
    const index = data.findIndex(item=>item.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Not found" });

  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json(data[index]);
})

router.delete("/:id", (req, res) => {
  const data = readData();
  const newData = data.filter(item => item.id !== req.params.id);
  writeData(newData);
  res.json({ message: "Deleted" });
});

module.exports = router
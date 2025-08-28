
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./Model/listing.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/Wanderlust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("server is working");
});



app.get("/testListing", async (req, res)=>{
  let sampleListing = new Listing({
    title:"my new villa",
    description:"by the beach",
    price:2000,
    location:"california, goa",
    country:"india",
  });

  await  sampleListing.save();
  console.log("sample was saved");
  res.send("successful testing");
});





















app.listen(8080,()=>{
    console.log("app is listening to port 8080");
});

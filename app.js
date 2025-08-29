
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./Model/listing.js");
const path = require("path");

const methodOverride = require("method-override");


app.set("view engine","ejs");
app.set("views" ,path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


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
// index route

app.get("/listings", async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

// app.get("/listings",(req,res)=>{
//     Listing.find({}).then((res) =>{
//         console.log(res);
//     })
// })

// app.get("/testListing", async (req, res)=>{
//   let sampleListing = new Listing({
//     title:"my new villa",
//     description:"by the beach",
//     price:2000,
//     location:"california, goa",
//     country:"india",
//   });

//   await  sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

//new listings
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})


//show route
app.get("/listings/:id", async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

});

//CREATE
app.post("/listings", async (req, res) => {
    // await newListing.save();
    // res.redirect("/listings");
// let listing = req.body.listing;
let newListing = new Listing(req.body.listing);

await newListing.save();
res.redirect("/listings");
});


//edit route 
app.get("/listings/:id/edit",async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

})

//update route
 app.put("/listings/:id", async(req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
 });


 //delete listing

 app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
 });






















app.listen(8080,()=>{
    console.log("app is listening to port 8080");
});

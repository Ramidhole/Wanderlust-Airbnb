const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title: {
        type: "String",
        requird: true
    },

    description: "String",


    image: {
        type: "String",
        default: "https://unsplash.com/photos/white-boat-in-between-rocky-mountains-sydwCr54rf0",
        set: (v) => v === "" ? "https://unsplash.com/photos/white-boat-in-between-rocky-mountains-sydwCr54rf0" 
        : v,
    },
    price: "Number",
    location: "String",
    country: "String",
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
 
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://jenish1:qwert1234@firstdatabase.zspz9.mongodb.net/test?retryWrites=true&w=majority"
  );
};

// schema
const citySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    city: { type: String, required: true },
    population: { type: Number, required: true },
    country: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// model
const City = new mongoose.model("City", citySchema);

//crud
//getting data
app.get("/", async (req, res) => {
  try {
    const cities = await City.find().lean().exec();
    res.send(cities);
  } catch (error) {
    console.log(error);
  }
});

//posting data

app.post("/", async (req, res) => {
  try {
    const city = await City.create(req.body);
    return res.send(city);
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  try {
    await connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB" + error);
  }
});

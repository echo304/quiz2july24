const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;

// Create a Model object with myName and mySID as properties
const mySchema = new Schema({
  myName: String,
  mySID: String
}, { collection: 's24students' });

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const uri = req.body.myuri;

  try {

    // connect to the database and log the connection
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to the database successfully");

    // add the data to the database
    const myModel = mongoose.model('s24students', mySchema);
    await myModel.create({ myName: "Sangboak Lee", mySID: "300387936" });

    // send a response to the user
    res.send(`<h1>Document  Added</h1>`);
  } catch (error) {
    console.log(error);
    res.send("An error occurred");
  } finally {
    // close the connection
    await mongoose.disconnect();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

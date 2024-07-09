import express, { Router } from "express";
import User from "../Models/User.js";

const router = express.Router();

// Fetching all user's account
router.get("/", async (req, res) => {
  try {
    const collection = await User.find({});
    const result = collection;
    if (result) {
      return res.json(collection).json({ message: "Users were found in the Database" });
      // res.json({ message: "Users were found in the Database" });
    } else {
      return res.status(404).json({ message: "Users is not in the Database" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Fetching a specific user of the account
router.get("/:id", async (req, res) => {
  try {
    // const newDocument = req.body;
    const id = { _id: req.params.id };
    console.log(id);
    const collection = await User.findById(id);
    if (collection) {
      return res.status(200).json(collection).json({ message: "User was found in the Database" });
      // res.status(200).json({ message: "User was found in the Database" });
    } else {
      return res.status(404).json({ message: "User is not in the Database" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Creating a New User Account
router.post("/", async (req, res) => {
  try {
    const { username, email, password, cpassword, dob } = req.body;
    console.log(req.body);
    // Checking if user exists in DB
    const dbUser = await User.findOne({ username });
    // If the user don't exists in create a new user profile
    if (dbUser) {
      console.log(dbUser);
      res.json('You have account aleady')
    } else {
      if (password === cpassword) {
        const newUser = await User.create({ username, email, password, dob });
        return res.status(200).json(newUser);
        console.log(newUser);
        console.log("User acount was created in the Database");
      } else {
        return res.status(404).json({ message: "User account was not created in the Database" });
      }
      }
   } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Updating User Account
router.patch("/:id", async (req, res) => {
  try {
    const newDocument = req.body;
    const id = { _id: req.params.id };
    const collection = await User.findByIdAndUpdate(id, newDocument);
    const result = collection;
    if (result) {
      return res.status(200).json(collection);
      console.log("User account was updated from Database");
    } else {
      return res.status(404).json({ message: "User account was not updated from Database" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Deleting a User Account
router.delete("/:id", async (req, res) => {
  try {
    const newDocument = req.body;
    const id = { _id: req.params.id };
    const result = await User.findByIdAndDelete(id, newDocument);
    if (!result) {
      return res.status(404).json({ message: "User account was not deleted from Database" });
    } else {
      return res.status(200).json({ message: "User account was deleted from Database" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

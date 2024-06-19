import express, { Router } from "express";
import User from "../Models/User.js";
import Deck from "../Models/Deck.js";
import Profile from "../Models/Profile.js";

const router = express.Router();

// Fetching all user's account
router.get("/", async (req, res) => {
  try {
    const collection = await User.find({});
    const collection1 = await Profile.find({});
    const collection2 = await Deck.find({});
    const result = collection;
    if (result) {
      return res.json(collection);
    } else {
      res.json({ message: "Users were found in the Database" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Users is not in the Database" });
  }
});

// Fetching a specific user of the account
router.get("/:id", async (req, res) => {
  try {
    const newDocument = req.body;
    const id = { _id: req.params.id };
    console.log(id);
    const collection = await User.findById(id);
    const collection1 = await Profile.findById(id);
    const collection2 = await Deck.findById(id);
    if (collection) {
      return res.json(collection);
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
    const { username, password, email, dob } = req.body;
    console.log(req.body);
    // Checking if user exists in DB
    const dbUser = await User.findOne({ username });
    // If the user don't exists in create a new user profile
    if (dbUser) {
      console.log(dbUser);
    } else {
      const newUser = await User.create({ username, password, email, dob });
      await Profile.create({ user: newUser._id });
      await Deck.create({ user: newUser._id });
      console.log(newUser);
      if (newUser) {
        return res.json(newUser);
        // return res.status(200).json({ message: "User acount was created in the Database" });
      } else {
        return res
          .status(404)
          .json({ message: "User account was not created in the Database" });
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
    const collection1 = await Profile.findByIdAndUpdate(id, newDocument);
    const collection2 = await Deck.findByIdAndUpdate(id, newDocument);
    const result = collection;
    if (result) {
      return res.json(collection);
      // res.status(200).json({ message: "User account was updated from Database" });
    } else {
      return res
        .status(404)
        .json({ message: "User account was not updated from Database" });
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
    const result1 = await Deck.findByIdAndDelete(id, newDocument);
    const result2 = await Profile.findByIDAndDelete(id, newDocument);
    if (!result && !result1 && !result2) {
      return res
        .status(404)
        .json({ message: "User account was not deleted from Database" });
    } else {
      return res
        .status(200)
        .json({ message: "User account was deleted from Database" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;

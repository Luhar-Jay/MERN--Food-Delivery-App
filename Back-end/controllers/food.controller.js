import Food from "../models/food.model.js";
import fs from "fs";
//add food items

const addFood = async (req, res) => {
  // add image
  let image_filename = `${req.file.filename}`;

  //   add food item
  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();

    // Create food object with full image URL
    const foodWithImageUrl = {
      ...food.toObject(),
      imageUrl: `http://localhost:8080/images/${image_filename}`,
    };

    res.json({ success: true, message: "Food added", food: foodWithImageUrl });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// All food list

const listFood = async (req, res) => {
  try {
    const food = await Food.find({});

    // Add full image URL to each food item
    const foodWithImageUrls = food.map((item) => ({
      ...item.toObject(),
      imageUrl: `http://localhost:8080/images/${item.image}`,
    }));

    res.status(200).json({
      data: foodWithImageUrls,
      success: true,
      message: "All food fetch successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "All food fetch failed",
    });
  }
};

// remove food item
const removeFood = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ success: false, message: "Missing ID" });
  }

  try {
    const food = await Food.findByIdAndDelete(id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    res.json({
      success: true,
      message: "Item deleted successfully",
      data: food,
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addFood, listFood, removeFood };

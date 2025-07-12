import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    reqiured: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);
export default Food;

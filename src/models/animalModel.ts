import { model, Schema } from "mongoose";

// const categorySchema = new Schema({
//   categoryName: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: String,
//     default: new Date().toISOString()
//   }
// });

const petSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  image_id: {
    type: String,
  },
  seller_id: {
    type: String,
    required: true
  },
  stock: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  createdAt: {
    type: String,
    default: new Date().toISOString()
  }
});

export default model("category", petSchema);

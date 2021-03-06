import Carts from "../models/cartModel";

export const createOrder = async (body: Animal) => {
  //   console.log(id)
  const {
    name,
    breed,
    description,
    price,
    image_url,
    quantity,
    category_id,
    user_id
  }: Animal = body;
  console.log({ name: body.name, breed, price });
  try {
    let cart = new Carts({
      name,
      breed,
      price,
      description,
      image_url,
      quantity,
      category_id: category_id,
      user_id
    });
    return await cart.save();
  } catch (error) {
    return { error: error.message };
  }
};

export const getCarts = async () => {
  try {
    const carts = await Carts.find().sort({ createdAt: -1 });
    return carts;
  } catch (error) {
    return { error: error.message };
  }
};

export const getCart = async () => {
  try {
    const cart = await Carts.find();
    return cart;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteCart = async (req: any) => {
  const { deleteId } = req.params;
  try {
    await Carts.findByIdAndDelete(deleteId);
    return "Successfully deleted";
  } catch (error) {
    return { error: error.message };
  }
};

interface Animal {
  name: string;
  breed: string;
  price: string;
  description: string;
  age: string;
  location: string;
  stock?: string;
  image_url: string;
  category_id: string;
  image_id: any;
  user_id: string;
  quantity: string;
  // [key: string]:string|number|boolean;
}

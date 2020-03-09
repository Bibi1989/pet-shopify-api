import Animals from "../models/animalModel";

export const createPets = async (body: Animal, req: any, res: any) => {
  const { id } = req.user;
  const {
    name,
    breed,
    description,
    age,
    price,
    stock,
    location,
    image_url,
    phone
  }: Animal = body;
  const error = validatePets(name, breed, price, description, age, location);
  if (error.age) return { error: error.age };
  if (error.name) return { error: error.name };
  if (error.breed) return { error: error.breed };
  if (error.price) return { error: error.price };
  if (error.description) return { error: error.description };
  if (error.location) return { error: error.location };

  let animal = new Animals({
    name,
    breed,
    price,
    description,
    age,
    stock,
    location,
    image_url,
    phone,
    image_id: id,
    seller_id: id
  });
  return await animal.save();
};

export const updatePets = async (body: Animal, updateId: string) => {
  const {
    name,
    breed,
    description,
    age,
    price,
    stock,
    location
  }: Animal = body;
  const error = validatePets(name, breed, price, description, age, location);
  if (error.age) return { error: error.age };
  if (error.name) return { error: error.name };
  if (error.breed) return { error: error.breed };
  if (error.price) return { error: error.price };
  if (error.description) return { error: error.description };
  if (error.location) return { error: error.location };

  try {
    const updateObj = {
      name,
      breed,
      description,
      age,
      price,
      location,
      stock,
    };
    const animal = await Animals.findByIdAndUpdate(updateId, updateObj, {
      new: true
    });
    return animal;
  } catch (error) {
    return { error: error.message };
  }
};

export const getPets = async () => {
  try {
    const animals = await Animals.find().sort({ createdAt: -1 });
    return animals;
  } catch (error) {
    return { error: error.message };
  }
};

export const getPet = async (id: string) => {
  try {
    const animals = await Animals.findById(id);
    return animals;
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
  stock: number;
  image_url: string;
  phone?: string;
  // [key: string]:string|number|boolean;
}

function validatePets(
  name: string,
  breed: string,
  price: string,
  description: string,
  age: string,
  location: string
) {
  const error: Animal = {
    name: "",
    price: "",
    breed: "",
    description: "",
    age: "",
    stock: 0,
    location: "",
    image_url: ""
  };
  if (name.trim() === "") {
    error.name = "Name is empty";
  }
  if (breed.trim() === "") {
    error.breed = "Breed is empty";
  }
  if (price.trim() === "") {
    error.price = "Price is empty";
  }
  if (description.trim() === "") {
    error.description = "Description is empty";
  }
  if (age.trim() === "") {
    error.age = "Age is empty";
  }
  if (location.trim() === "") {
    error.location = "Location is empty";
  }
  return error;
}

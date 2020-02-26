import Animals from "../models/animalModel";
import multer from "multer";
import path from "path";
const cloudinary = require("cloudinary");
// import cloudinaryStorage from "multer-storage-cloudinary";
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// const storages = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "pet",
//   allowedFormats: ["jpg", "png"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }]
// });

// const storage = multer.diskStorage({
//   // destination: function(req, file, cb) {
//   //   cb(null, "public");
//   // },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

const checkFileType = (file: any, cb: any) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extensionName = filetypes.test(path.extname(file.originalname));
  const mimeTypes = filetypes.test(file.mimetype);
  if (extensionName && mimeTypes) {
    return cb(null, true);
  } else {
    return cb("error images only");
  }
};

// const upload = multer({
//   storage: storage,
//   //   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   }
// }).single("file");

export const createPets = async (body: Animal, req: any, res: any) => {
  const { id } = req.user;
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

  console.log(req.body);

  // upload(req, res, err => {
  //   if (err) return { error: "Cant upload image" };
  //   if (req.file === undefined) {
  //     return { error: "field is empty" };
  //   } else {
  //     path = `${req.path}`;
  //   }
  //   console.log("pic", req.file);
  //   return pic;
  // });

  await cloudinary.uploader.upload(
    req.files.image.path,
    async (result: any) => {
      try {
        console.log(result);
        console.log("loc", location);
        let animal = new Animals({
          name,
          breed,
          price,
          description,
          age,
          stock,
          location,
          image_url: result.url,
          image_id: result.public_id,
          seller_id: id
        });
        console.log(animal);
        return await animal.save();
      } catch (error) {
        return { error: error.message };
      }
    }
  );
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
      stock
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

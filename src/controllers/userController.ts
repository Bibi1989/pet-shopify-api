import Users from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: any) => {
  const { name, phone, email, password, isSeller }: any = req.body;
  const error = validateUsers(name, phone, email, password);
  if (error.name || error.email || error.password) {
    return res.status(404).json({ error });
  }
  let user: any = await Users.findOne({ email });
  if (user)
    return res.status(404).json({ error: "Email taken, try another one" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(req.body);
  const bool: boolean = isSeller === "seller" ? true : false;

  try {
    const registerUser: RegisterInterface = {
      name,
      phone,
      email,
      password: hashedPassword,
      isSeller: bool
    };

    user = new Users(registerUser);

    const { SECRET_KEY } = process.env;

    await user.save();
    const token: string = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        isSeller: user.isSeller
      },
      SECRET_KEY
    );
    res.header("x-auth", token);
    res.json({
      data: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        isSeller: user.isSeller
      },
      token
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const login = async (req: Request, res: any) => {
  const { email, password }: any = req.body;
  const error = validateAuth(email, password);
  if (error.email || error.password) {
    return res.status(404).json({ error });
  }

  let user: any = await Users.findOne({ email });
  if (!user) return res.status(404).json({ error: "You have not register" });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.status(404).json({ error: "Invalid password" });

  try {
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        isSeller: user.isSeller
      },
      SECRET_KEY
    );

    res.header("x-auth", token);
    res.json({
      data: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        isSeller: user.isSeller
      },
      token
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

function validateUsers(
  name: string,
  phone: string,
  email: string,
  password: string
) {
  const error: RegisterInterface = {
    name: "",
    phone: "",
    email: "",
    password: ""
  };
  if (name.trim() === "") {
    error.name = "name is empty";
  }
  if (phone.trim() === "") {
    error.phone = "Phone Number is empty";
  } else {
    if (phone.length < 4) {
      error.phone = "Phone number is less than 4 characters";
    }
  }
  if (email.trim() === "") {
    error.email = "Email is empty";
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      error.email = "Email is not valid";
    }
  }
  if (password.trim() === "") {
    error.password = "Password is empty";
  }
  return error;
}

export const getProfile = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userProfile = await Users.findById(id);
    console.log(req.params.id);
    return res.json({ profile: userProfile });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

function validateAuth(email: string, password: string) {
  const error: LoginInterface = {
    email: "",
    password: ""
  };
  if (email.trim() === "") {
    error.email = "Email is empty";
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      error.email = "Email is not valid";
    }
  }
  if (password.trim() === "") {
    error.password = "Password is empty";
  }
  return error;
}

interface LoginInterface {
  email: string;
  password: string;
}

interface RegisterInterface {
  name: string;
  email: string;
  phone: string;
  password: string;
  isSeller?: boolean;
}

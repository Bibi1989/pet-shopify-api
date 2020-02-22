const Users = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req: Request, res: any) => {
  const { name, phone, email, password }: any = req.body;
  const error = validateUsers(name, phone, email, password);
  if (error.name || error.email || error.password) {
    return res.status(404).json({ error });
  }
  let user = await Users.findOne({ email });
  if (user)
    return res.status(404).json({ error: "Email taken, try another one" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const registerUser = {
      name,
      phone,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    user = new Users(registerUser);

    const { SECRET_KEY } = process.env;
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      SECRET_KEY
    );

    await user.save();
    res.json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports.login = async (req: Request, res: any) => {
  const { email, password }: any = req.body;
  const error = validateAuth(email, password);
  if (error.email || error.password) {
    return res.status(404).json({ error });
  }

  let user = await Users.findOne({ email });
  if (!user) return res.status(404).json({ error: "You have not register" });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.status(404).json({ error: "Invalid password" });

  try {
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      SECRET_KEY
    );

    res.json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email
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
    error.name = "Username is empty";
  }
  if (phone.trim() === "") {
    error.name = "Phone Number is empty";
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
}

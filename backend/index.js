const express = require("express");
const cors = require("cors");
const port = 3000;
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middlewares/authMiddleware");
const app = express();
const coreOptions = {
  origin: "*", // Allow requests from any origin, replace with specific origins if needed
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const users = [
  {
    id: "1",
    name: "Lakindu",
    username: "lak",
    password: "1234",
    role: "customer",
  },
  {
    id: "2",
    name: "David",
    username: "david",
    password: "1234",
    role: "customer",
  },
  {
    id: "3",
    name: "John",
    username: "john",
    password: "1234",
    role: "customer",
  },
  {
    id: "4",
    name: "Nishanthan",
    username: "nishanthan",
    password: "1234",
    role: "customer",
  },
  {
    id: "5",
    name: "Pasindu",
    username: "pasindu",
    password: "1234",
    role: "customer",
  },
  {
    id: "6",
    name: "Sahan",
    username: "sahan",
    password: "1234",
    role: "admin",
  },
];

function erroHandler(err, req, res, next) {
  console.log(err.message);

  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
}

//converting users object to array
const usersArray = Object.values(users);
console.log(typeof usersArray, "new");
app.use(cors(coreOptions));
//const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(erroHandler);

app.get("/", (req, res) => {
  console.log("hello world new");
  return res.status(200).json({
    message: "hello world",
  });
});

app.post("/login", (req, res) => {
  try {
    console.log("type of ", typeof users);
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);

    console.log("name", username, "ps", password, "user", user);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    if (user.password === password) {
      const token = jwt.sign(
        {
          role: user.role,
        },
        "jwt-secret",
        {
          algorithm: "HS256",
          expiresIn: "30m",
          issuer: "my-api",
          subject: user.id,
        }
      );
      console.log("token is generated");
      return res.status(200).json({
        message: "Login Successful",
        token: token,
      });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/users", authMiddleware("admin"), (req, res) => {
  return res.status(200).json({
    message: "All Users",
    users,
  });
});

app.get("/user/:id", authMiddleware("admin"), (req, res) => {
  const id = req.params.id;
  console.log("id", id);

  const user = users.find((user) => id == user.id);
  if (user) {
    return res.status(200).json({
      message: "User Found",
      user,
    });
  } else {
    return res.status(404).json({
      message: "User not found",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

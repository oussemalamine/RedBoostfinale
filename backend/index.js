require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); // Import body-parser
const passport = require("passport");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()); // Naming the file
  },
});
const upload = multer({
  storage: storage,
});
const db = process.env.DATABASE_URI;
const secret = process.env.SECRET;
const PORT = process.env.PORT || 5000; //this is can be changed careful with it !!!!!!!!!!
const app = express();
const signupRoute = require("./routes/api/register");
const loginRoute = require("./routes/api/login");
const checkAuthRoute = require("./routes/api/checkAuth");
const logoutRoute = require("./routes/api/logout");
const usersRoute = require("./routes/api/users");
const UpdateUser = require("./routes/api/UpdateUser");
const checkPass = require("./routes/api/checkPass");
const AddEvent = require("./routes/api/AddEvent");
const getEvents = require("./routes/api/getEvents");
const deleteEvent = require("./routes/api/DeleteEvent");
const UpdateEvent = require("./routes/api/UpdateEvent");
const forgetPassword = require("./routes/api/ForgetPassword");
const handleProgram = require("./routes/api/handleProgram");
const handleActivity = require("./routes/api/handleActivity");
const hundleEntrepreneur = require("./routes/api/hundleEntrepreneur");
const handleStartups = require("./routes/api/handleStartups");
const handleTask = require("./routes/api/handleTask");
const sessionsRoute = require("./routes/api/Sessions");
require("./passport/index");

// Increase payload size limit for body-parser
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" })); // Set a higher limit for JSON requests

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const store = new MongoDBSession({
  uri: db,
  collection: "sessions",
});
// Add event listeners to the store
store.on("connected", () => {
  console.log("Session store connected!");
});

store.on("error", (error) => {
  console.error("Session store error:", error);
});
app.use(
  session({
    key: "sessionId",
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // maxAge: 30 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//configure the server to serve statically the files from the backend server with no sniff
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res, path) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
    },
  })
);

app.post('/upload', upload.single('deliverableFile'), (req, res) => {
  console.log('File received:', req.file); // Debugging log

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send({
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Routes
app.post("/upload", upload.single("logo"), (req, res) => {
  // 'logo' is the name of the form field in your frontend
  if (req.file) {
    // Handle the file information and reference in the database here
    res.status(200).send(req.file);
  } else {
    res.status(400).send({ message: "File upload failed" });
  }
});
app.post("/register", signupRoute);
app.post("/login", loginRoute);
app.post("/events", AddEvent);
app.post("/forget-password", forgetPassword);
app.get("/login", checkAuthRoute);
app.get("/logout", logoutRoute);
app.post("/loadCurrentUser", usersRoute);
app.post("/loadUsers", usersRoute);
app.get("/checkPass", checkPass);
app.get("/events", getEvents);
app.put("/users/:userId", UpdateUser);
app.delete("/deleteUser/:userId", usersRoute);
app.put("/updateUser/:userId", usersRoute);
app.put("/events/:idEvent", UpdateEvent);
app.delete("/events/:idEvent", deleteEvent);
app.post("/addProgram", handleProgram);
app.delete("/deleteProgram/:programId ", handleProgram);
app.put("/updateProgram/:programId", handleProgram);
app.post("/loadPrograms", handleProgram);
app.post("/addActivity", handleActivity);
app.delete("/deleteActivity/:activityId", handleActivity);
app.put("/updateActivity/:activityId", handleActivity);
app.post("/loadActivity/:activityId", handleActivity);
app.post("/loadActivitiesByProgramId/:programId", handleActivity);
app.post("/createntrepreneurs", hundleEntrepreneur);
app.post("/createstartup", handleStartups);
app.get("/loadAllentrepreneurs", hundleEntrepreneur);
app.post("/addTask", handleTask);
app.post("/loadTask/:taskId", handleTask);
app.delete("/deleteTask/:taskId", handleTask);
app.put("/updateTask/:taskId", handleTask);
app.post("/loadTasks", handleTask);
app.post("/loadTasksByActivityId/:activityId", handleTask);
app.get("/sessions", sessionsRoute);
// Database + Server Connection Validation
mongoose
  .connect(db)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database Connected!");
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

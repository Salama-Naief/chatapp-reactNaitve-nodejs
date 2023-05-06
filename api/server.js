import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import passport from "passport";
import { Server, Socket } from "socket.io";
import session from "express-session";
import cookieParser from "cookie-parser";
import expressFlash from "express-flash";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import expressErrorHandler from "express-async-errors";
import { connectDB } from "./db/connect-db.js";
import passportSetup from "./middleware/passportSetup.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import notFoundRoute from "./errors/not-found-route-middleware.js";
import errorHandlerMiddleware from "./errors/error-handler-middleware.js";
import { authGard } from "./middleware/auth.middleware.js";
import { cocketConnection } from "./utils/web-sockets.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";

//config
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//const
const app = express();
const port = process.env.PORT || 5000;
expressErrorHandler;
passportSetup;
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => cocketConnection(socket));
let connectedUsers = [];
/*io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    /*connectedUsers.push({
      user
    })
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    socket.emit("connect to rom", room);
    console.log("User Joined Room: " + room);
    socket.on("newMessage", (newMessageRecieved) => {
      console.log("newMessage");
      if (
        newMessageRecieved.conversationId._id.toString() === room.toString()
      ) {
        console.log("newMessage inside if");
        socket.to(room).emit("room", newMessageRecieved);
      }
    });
  });

  socket.on("newMessage", (newMessageRecieved) => {
    console.log("new message", newMessageRecieved);

    let conv = newMessageRecieved.conversationId;

    if (!conv.users) return console.log("chat.users not defined");
    //socket.to(conv._id).emit("room", newMessageRecieved);

    conv.users.forEach((user) => {
      if (user === newMessageRecieved.sender._id) return;
      console.log("fffdfdfd", user);
      io.to(user).emit("message recieved", newMessageRecieved);
      socket.to(user).emit("message recieved", newMessageRecieved);
      socket.in(user).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("msg", (msg) => {
    console.log("mag", msg);
  });
});*/

app.set("trust proxy", 1);

//middleware
app.use(expressFlash());
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 1000,
      expires: 60 * 60 * 24 * 1000,
    },
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload({ useTempFiles: true }));

//route
app.get("/api/test", (req, res) => {
  res.send("test tst ");
});
app.use("/api/auth", authRoute);
app.use("/api/users", authGard, userRoute);
app.use("/api/conversation", authGard, conversationRoute);
app.use("/api/messages", authGard, messageRoute);

app.use(notFoundRoute);

app.use(errorHandlerMiddleware);

//start function
const startFunc = async () => {
  try {
    await connectDB();
    app.set("port", process.env.PORT || 5000);

    httpServer.listen(app.get("port"), function () {
      var port = httpServer.address().port;
      console.log("Running on : ", port);
    });
    // server.listen(port, () => console.log(`server is running on Port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startFunc();

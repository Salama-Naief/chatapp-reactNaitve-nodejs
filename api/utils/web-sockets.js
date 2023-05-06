//class WebSockets {
let users = [];

export const cocketConnection = (client) => {
  // event fired when the chat room is disconnected
  client.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== client.id);
  });

  // add identity of user mapped to the socket id
  //when user is connected this function will fired
  client.on("identity", (userId) => {
    console.log("identity", userId);
    users.push({
      socketId: client.id,
      userId,
    });
  });

  // subscribe person to chat & other user as well
  //user enter chat room
  client.on("subscribe", (room, otherUserId = "") => {
    console.log("subscribe", room);
    subscribeOtherUser(room, otherUserId);
    client.join(room);
    client.on("newMessage", (newMessageRecieved) => {
      console.log("newMessage");
      if (
        newMessageRecieved.conversationId._id.toString() === room.toString()
      ) {
        console.log("newMessage inside if");
        client.to(room).emit("room", newMessageRecieved);
      }
    });
  });
  ////////

  /* client.on("newMessage", (newMessageRecieved) => {
    console.log("new message", newMessageRecieved);

    let conv = newMessageRecieved.conversationId;

    if (!conv.users) return console.log("chat.users not defined");
    //socket.to(conv._id).emit("room", newMessageRecieved);

    conv.users.forEach((user) => {
      if (user === newMessageRecieved.sender._id) return;
      const u = users.find((uu) => uu.userId.toString() === user.toString());
      console.log("fffdfdfd", user);
      client.to(u.socketId).emit("message recieved", newMessageRecieved);
    });
  });*/
  // mute a chat room
  // user leave chat room
  client.on("unsubscribe", (room) => {
    console.log("unsubscribe", room);
    client.leave(room);
  });
};

//fuction that fired when user enter a room
const subscribeOtherUser = (room, otherUserId) => {
  //if the user connected from multi devices like phone and web at the same time or from multi phone
  //so it has mutli socketIds
  //so we filter them and return a arry of socktids
  const userSockets = users.filter((user) => user.userId === otherUserId);
  //map the arry of socktids
  userSockets.map((userInfo) => {
    const socketConn = global.io.sockets.connected(userInfo.socketId);
    if (socketConn) {
      socketConn.join(room);
    }
  });
};
//}

//export default new WebSockets();

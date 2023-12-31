import mongoose from "mongoose";
import app from "./app";
import env from "./utils/env";
import User from "./models/user";
import { ObjectId } from "mongodb";

// Connect to MongoDB
mongoose.connect(env.MONGODB_URI, {dbName: "chat-interface-0"}).then(() => {
  // Create default user if it doesn't exist
  User.findByUsername('defaultuser', false).then((user) => {
    if (user) {
      console.log('Default user already exists');
      return;
    } else {
      new User({
        username: 'defaultuser',
        firstName: 'John',
        lastName: 'Doe',
        chatId: new ObjectId().toString(),
      }).save();
      console.log('Default user created');
    }
  })
});

app.listen(env.PORT, () => {
  console.log(`Service is listening on port ${env.PORT}`);
});

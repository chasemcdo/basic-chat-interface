import User from "../models/user";

export const getDefaultChatId = async (): Promise<string> => {
  return await User.findByUsername("defaultuser", false).then((user) => {
    if (user !== null) {
      return user.chatId;
    } else {
      Error("Default user does not exist");
      return null;
    }
  });
};

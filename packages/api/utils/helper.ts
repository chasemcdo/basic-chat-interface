import User from "../models/user";

export const getDefaultChatId = async (): Promise<string> => {
  return await User.findByUsername("defaultuser", false).then((user) => {
    if (user !== null && user.chatIds.length > 0) {
      return user.chatIds[0];
    } else {
      Error("Default user does not exist");
      return null;
    }
  });
};

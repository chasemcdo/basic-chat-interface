import env from "./env";

export const apiSendMessage = (
  message: string,
) =>
  fetch(env.API_URL + "/api/chats", {
    method: "POST",
    body: JSON.stringify({
      message
    })
  });

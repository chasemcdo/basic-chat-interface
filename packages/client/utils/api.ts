import env from "./env";

export const apiSendMessage = (
  message: string,
) =>
  fetch(env.API_URL + "/api/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message
    })
  });

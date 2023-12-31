import env from "./env";

export const apiSendMessage = (
  message: string,
) =>
  fetch(env.API_URL + "/users/msg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message
    })
  });

export const apiGetMessages = () =>
  fetch(env.API_URL + "/users/msg", {
    method: "GET"
  });

export const apiResetMessages = () =>
  fetch(env.API_URL + "/users/msg", {
    method: "DELETE"
  });

import env from "./env";

export const apiSendMessage = (
  message: string,
  id: string
) =>
  fetch(env.API_URL + `/chats/msg?id=${id}&message=${message}`, {
    method: "POST"
  });

export const apiGetMessages = (id: string) =>
  fetch(env.API_URL + `/chats/msg?id=${id}`, {
    method: "GET"
  });

export const apiResetMessages = (id: string) =>
  fetch(env.API_URL + `/chats/msg?id=${id}`, {
    method: "DELETE"
  });

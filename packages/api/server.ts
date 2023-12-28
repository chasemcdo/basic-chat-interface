import env from "./utils/env";

const app = require("./app");

app.listen(env.PORT, () => {
  console.log("Service is listening on port 5678");
});

import app from "./app";
import env from "./utils/env";

app.listen(env.PORT, () => {
  console.log("Service is listening on port 5678");
});

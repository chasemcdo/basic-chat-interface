export default {
  MONGODB_URI:
    process.env.MONGODB_URI ?? "mongodb://root:secret@localhost:27017",
  PORT: process.env.PORT ?? "3001",
};

import { type Request, type Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(404).send();
});

module.exports = router;

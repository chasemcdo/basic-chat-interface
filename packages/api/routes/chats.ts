import { NextFunction, Request, Response, Router } from "express";

var router = Router();

router.post('/', function(req: Request, res: Response, next: NextFunction) {
  res.send({
    message: 'Message Sent Successfully!'
  });
});

module.exports = router;

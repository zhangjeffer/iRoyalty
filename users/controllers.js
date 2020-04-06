const express = require("express");
const router = express.Router();
const loginService = require("./login-service");

function register(req, res, next){
    loginService.register(req.body)
    .then(() => res.json(req.body))
    .catch(err => next(err));
}

function remove(req, res, next){
    loginService.remove(req.body)
    .then(() => res.json({message: "Success"}))
    .catch(err => next(err));
}

router.post("/register", register);
router.delete("/remove", remove);

module.exports = router;
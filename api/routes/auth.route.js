import express from "express";
import passport from "passport";

const router = express.Router();

router.post(
  "/local/login",
  passport.authenticate("local-signin", {
    successRedirect: "/api/users/me",
    failureRedirect: "/api/auth/err",
    failureFlash: true,
  }),
  function (req, res) {
    res.send("");
  }
);

router.post(
  "/local/register",
  passport.authenticate("local-signup", {
    successRedirect: "/api/users/me",
    failureRedirect: "/api/auth/err",
    failureFlash: true,
  }),
  function (req, res) {
    res.send("");
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  req.session.destroy(function (err) {
    res.redirect("/"); //Inside a callback… bulletproof!
  });
});

router.get("/err", (req, res) => {
  res.send({ message: req.session.flash.error[0] });
});
export default router;

import express from "express";
import passport from "passport";

const router = express.Router();
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    req.login(req.user, function (err) {
      if (err) {
        return res.redirect("/login");
      }

      req.body = {
        email: req.user.email,
        googleId: req.user.googleId,
      };

      autenticar(req, res);
    });
  }
);

export default router;

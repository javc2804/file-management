import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

// app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static("images"));

app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

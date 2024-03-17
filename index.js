import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import cors from "cors";

// Documentacion
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDocument from "./File-Management.postman_collection.json-Swagger20.json" assert { type: "json" };

import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import fileUpload from "express-fileupload";

// Rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

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

const specs = swaggerJsdoc(options);

app.use(express.static("images"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(passport.initialize());
app.use(passport.session());

// Routing

app.use("/usuarios", usuarioRoutes);
app.use("/files", fileRoutes);
app.use("/images", imageRoutes);

const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

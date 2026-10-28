
import { Router } from "express";
import multer from "multer";

import * as mycontroller from "../controller/eventosController.js";
import uploadEventos from "../middlewares/uploadEventos.js";

const pointName = mycontroller.getTableName() || "eventos";

const endPoint = `/${pointName}`;

const router = Router();

// LISTAR EVENTOS PUBLICADOS
router.get(endPoint, (req, res) => {
    mycontroller.Get(req, res);
});

// CONSULTAR EVENTO PUBLICADO
router.get(`${endPoint}/:id`, (req, res) => {
    mycontroller.GetById(req, res);
});

// CADASTRAR EVENTO COM IMAGEM
router.post(
    endPoint,
    (req, res, next) => {
        uploadEventos.single("imagem")(req, res, (error) => {
            if (error) {
                const mensagem =
                    error instanceof multer.MulterError &&
                    error.code === "LIMIT_FILE_SIZE"
                        ? "A imagem deve ter no máximo 2 MB."
                        : error.message;

                return res.status(400).json({
                    message: "erro",
                    Error: mensagem
                });
            }

            next();
        });
    },
    (req, res) => {
        mycontroller.Post(req, res);
    }
);

// PUT e DELETE serão habilitados após
// a implementação de autenticação e autorização.

export default router;

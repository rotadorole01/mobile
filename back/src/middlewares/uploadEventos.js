
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PASTA DAS IMAGENS DOS EVENTOS
const pastaUploads = path.resolve(
    __dirname,
    "../../uploads/eventos"
);

fs.mkdirSync(pastaUploads, { recursive: true });

// TRANSFORMA O TÍTULO EM UM NOME DE ARQUIVO
function formatarNomeEvento(titulo) {
    return String(titulo || "evento")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .substring(0, 80) || "evento";
}

// ARMAZENAMENTO
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pastaUploads);
    },

    filename: function (req, file, cb) {
        const titulo = formatarNomeEvento(req.body.titulo);

        const identificador = crypto.randomUUID();

        const extensao =
            file.mimetype === "image/png" ? ".png" : ".jpg";

        const nomeArquivo =
            `${titulo}-${identificador}${extensao}`;

        cb(null, nomeArquivo);
    }
});

// FILTRO DE ARQUIVOS
const fileFilter = function (req, file, cb) {
    const tiposPermitidos = [
        "image/jpeg",
        "image/png"
    ];

    if (!tiposPermitidos.includes(file.mimetype)) {
        return cb(
            new Error("Apenas imagens JPG e PNG são permitidas.")
        );
    }

    cb(null, true);
};

// CONFIGURAÇÃO DO UPLOAD
const uploadEventos = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

export default uploadEventos;

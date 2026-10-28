
import * as myModel from "../model/eventosModel.js";
import fs from "fs/promises";

export function getTableName() {
    return myModel.tableName;
}

// CAMPOS PERMITIDOS NO CADASTRO
const camposEvento = [
    "titulo",
    "categoria",
    "descricao",
    "data_evento",
    "horario",
    "duracao",
    "local",
    "cidade",
    "bairro",
    "tipo_entrada",
    "valor_ingresso",
    "link",
    "nome_organizador",
    "email_organizador",
    "telefone_organizador"
];

function texto(valor) {
    return typeof valor === "string" ? valor.trim() : "";
}

function validarEvento(body) {
    const obrigatorios = [
        "titulo",
        "categoria",
        "descricao",
        "data_evento",
        "horario",
        "local",
        "cidade",
        "tipo_entrada",
        "nome_organizador",
        "email_organizador"
    ];

    for (const campo of obrigatorios) {
        if (!texto(body[campo])) {
            return `O campo ${campo} é obrigatório.`;
        }
    }

    const partesData = texto(body.data_evento).match(
        /^(\d{2})\/(\d{2})\/(\d{4})$/
    );

    if (!partesData) {
        return "A data deve estar no formato DD/MM/AAAA.";
    }

    const dia = Number(partesData[1]);
    const mes = Number(partesData[2]);
    const ano = Number(partesData[3]);

    const data = new Date(ano, mes - 1, dia);

    if (
        data.getFullYear() !== ano ||
        data.getMonth() !== mes - 1 ||
        data.getDate() !== dia
    ) {
        return "A data do evento é inválida.";
    }

    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(texto(body.horario))) {
        return "O horário deve estar no formato HH:MM.";
    }

    if (!["Gratuito", "Pago"].includes(body.tipo_entrada)) {
        return "O tipo de entrada deve ser Gratuito ou Pago.";
    }

    const valor = Number(
        String(body.valor_ingresso ?? "0").replace(",", ".")
    );

    if (
        !Number.isFinite(valor) ||
        valor < 0 ||
        (body.tipo_entrada === "Pago" && valor <= 0)
    ) {
        return "O valor do ingresso é inválido.";
    }

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            texto(body.email_organizador)
        )
    ) {
        return "O e-mail do organizador é inválido.";
    }

    if (
        body.aceitou_termos !== "true" &&
        body.aceitou_termos !== true &&
        body.aceitou_termos !== "1" &&
        body.aceitou_termos !== 1
    ) {
        return "É necessário aceitar os termos.";
    }

    return null;
}

async function removerArquivo(file) {
    if (file?.path) {
        try {
            await fs.unlink(file.path);
        } catch (error) {
            console.error("Erro ao remover imagem:", error.message);
        }
    }
}

// LISTAR EVENTOS PUBLICADOS
export async function Get(req, res) {
    try {
        const response = await myModel.Get();

        return res.status(
            response.message === "Success" ? 200 : 400
        ).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "erro",
            Error: error.message
        });
    }
}

// BUSCAR EVENTO POR ID
export async function GetById(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "erro",
                Error: "ID inválido."
            });
        }

        const response = await myModel.GetById(id);

        return res.status(
            response.message === "Success" ? 200 : 400
        ).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "erro",
            Error: error.message
        });
    }
}

// CADASTRAR EVENTO COM IMAGEM
export async function Post(req, res) {
    try {
        const body = req.body || {};

        const erro = validarEvento(body);

        if (erro) {
            await removerArquivo(req.file);

            return res.status(400).json({
                message: "erro",
                Error: erro
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "erro",
                Error: "A imagem do evento é obrigatória."
            });
        }

        // Confere a assinatura real de JPG e PNG
        const arquivo = await fs.readFile(req.file.path);
        const ehPng =
            arquivo.length >= 8 &&
            arquivo.subarray(0, 8).equals(
                Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
            );

        const ehJpg =
            arquivo.length >= 3 &&
            arquivo[0] === 0xff &&
            arquivo[1] === 0xd8 &&
            arquivo[2] === 0xff;

        const tipoCorreto =
            (req.file.mimetype === "image/png" && ehPng) ||
            (req.file.mimetype === "image/jpeg" && ehJpg);

        if (!tipoCorreto) {
            await removerArquivo(req.file);

            return res.status(400).json({
                message: "erro",
                Error: "O arquivo não é uma imagem JPG ou PNG válida."
            });
        }

        const payload = {};

        for (const campo of camposEvento) {
            payload[campo] = texto(body[campo]);
        }

        payload.valor_ingresso =
            body.tipo_entrada === "Gratuito"
                ? "0"
                : String(
                    Number(
                        String(body.valor_ingresso).replace(",", ".")
                    )
                );

        payload.imagem = `/uploads/eventos/${req.file.filename}`;
        payload.aceitou_termos = 1;

        const response = await myModel.Post(payload);

        if (response.message !== "Success") {
            await removerArquivo(req.file);

            return res.status(400).json(response);
        }

        return res.status(201).json({
            ...response,
            aviso: "Evento cadastrado e aguardando aprovação."
        });
    } catch (error) {
        await removerArquivo(req.file);

        console.error(error);

        return res.status(500).json({
            message: "erro",
            Error: "Não foi possível cadastrar o evento."
        });
    }
}

// ATUALIZAR EVENTO
// Ainda não será exposto publicamente.
export async function Put(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "erro",
                Error: "ID inválido."
            });
        }

        const response = await myModel.Put(req.body, id);

        return res.status(
            response.message === "Success" ? 200 : 400
        ).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "erro",
            Error: error.message
        });
    }
}

// DESATIVAR EVENTO
// Ainda não será exposto publicamente.
export async function Delete(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "erro",
                Error: "ID inválido."
            });
        }

        const response = await myModel.Delete(id);

        return res.status(
            response.message === "Success" ? 200 : 400
        ).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "erro",
            Error: error.message
        });
    }
}

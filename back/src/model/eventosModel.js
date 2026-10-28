
import { db } from "../databases/DatabaseContext.js";
import * as sqlutils from "../utils/sqlTextos.js";

export const tableName = "eventos";

// LISTAR EVENTOS PUBLICADOS
export async function Get(req, res) {
    try {
        const results = await db.execute(
            `SELECT * FROM ${tableName}
             WHERE ativo = 1
             ORDER BY data_evento, horario`
        );

        return {
            message: "Success",
            data: results[0]
        };
    } catch (error) {
        console.log(error);
        return {
            message: "error",
            Error: error.message
        };
    }
}

// CONSULTAR EVENTO POR ID
export async function GetById(id) {
    try {
        const results = await db.execute(
            `SELECT * FROM ${tableName}
             WHERE id = ? AND ativo = 1`,
            [id]
        );

        return {
            message: "Success",
            data: results[0]
        };
    } catch (error) {
        return {
            message: "error",
            Error: error.message
        };
    }
}

// CADASTRAR EVENTO
export async function Post(data) {
    try {
        const payload = {
            ...data,
            ativo: 0,
            aceitou_termos: data.aceitou_termos ? 1 : 0
        };

        sqlutils.extrair_dados(payload);

        const sqlFields = sqlutils.gerar_sqlFields();
        const sqlParms = sqlutils.gerar_sqlParams();
        const sqlValuesParms = sqlutils.listParms();

        const sqlTexto = `
            INSERT INTO ${tableName}
            (${sqlFields})
            VALUES (${sqlParms})
        `;

        console.log(sqlTexto);

        const results = await db.execute(
            sqlTexto,
            sqlValuesParms
        );

        return {
            message: "Success",
            data: results
        };
    } catch (error) {
        console.log(error);
        return {
            message: "error",
            Error: error.message
        };
    }
}

// ATUALIZAR EVENTO
export async function Put(data, id) {
    try {
        const payload = { ...data };

        // A publicação deve ser controlada por uma
        // funcionalidade administrativa separada.
        delete payload.ativo;
        delete payload.id;
        delete payload.created_at;

        if (Object.keys(payload).length === 0) {
            return {
                message: "error",
                Error: "Nenhum campo informado para atualização."
            };
        }

        sqlutils.extrair_dados(payload);

        const sqlSets = sqlutils.gerar_sqlSets();
        const sqlValuesParms = sqlutils.listParms();

        sqlValuesParms.push(id);

        const results = await db.execute(
            `UPDATE ${tableName}
             SET ${sqlSets}
             WHERE id = ?`,
            sqlValuesParms
        );

        return {
            message: "Success",
            data: results
        };
    } catch (error) {
        console.log(error);
        return {
            message: "error",
            Error: error.message
        };
    }
}

// DESATIVAR EVENTO
export async function Delete(id) {
    try {
        const results = await db.execute(
            `UPDATE ${tableName}
             SET ativo = 0
             WHERE id = ?`,
            [id]
        );

        return {
            message: "Success",
            data: results
        };
    } catch (error) {
        console.log(error);
        return {
            message: "error",
            Error: error.message
        };
    }
}

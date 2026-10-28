
import { Router } from "express";

import userRoutes from "./usersRoutes.js";
import municipiosRoutes from "./municipiosRoutes.js";
import estadosRoutes from "./estadosRoutes.js";
import dependenciasRoutes from "./dependenciaRoutes.js";
import authRoutes from "./authRoutes.js";
import clientes from "./clientesRoutes.js";
import rolesRoutes from "./rolesRoutes.js";
import usersRoles from "./usersRolesRoutes.js";
import alunosRoles from "./alunosRoutes.js";

// ROTAS DO ROTA DO ROLÊ
import eventosRoutes from "./eventosRoutes.js";

const swRoutes = Router();

// ROTAS ORIGINAIS DO PROFESSOR
swRoutes.use(userRoutes);

swRoutes.use(clientes);
swRoutes.use(alunosRoles);
swRoutes.use(authRoutes);

swRoutes.use(municipiosRoutes);
swRoutes.use(estadosRoutes);
swRoutes.use(dependenciasRoutes);
swRoutes.use(rolesRoutes);
swRoutes.use(usersRoles);

// ROTAS DOS EVENTOS
swRoutes.use(eventosRoutes);

export default swRoutes;

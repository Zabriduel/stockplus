import { Router } from "express";


import pessoaRoutes from "./pessoa.routes";

const router = Router();
router.use('/', pessoaRoutes);

export default router;
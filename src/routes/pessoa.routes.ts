import { Router } from "express";
import { PessoaController } from "../controllers/pessoa.controller";

const pessoaRoutes = Router();

const pessoaController = new PessoaController();

pessoaRoutes.get("/pessoas", pessoaController.selecionarTodos);
pessoaRoutes.get("/pessoas/:id", pessoaController.selecionarPorId);
pessoaRoutes.post("/pessoas", pessoaController.criar);
pessoaRoutes.put("/pessoas/:id", pessoaController.editar);
pessoaRoutes.delete("/pessoas/:id", pessoaController.deletar);

export default pessoaRoutes;
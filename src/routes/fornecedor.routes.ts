import { Router } from "express";
import { FornecedorController } from "../controllers/fornecedor.controller";

const fornecedorController = new FornecedorController();
const fornecedorRoutes = Router()

fornecedorRoutes.get('/fornecedores', fornecedorController.selecionar);
fornecedorRoutes.post('/fornecedores', fornecedorController.criar);
fornecedorRoutes.put('/fornecedores', fornecedorController.editar);
fornecedorRoutes.delete('/fornecedores', fornecedorController.deletar);


export default fornecedorRoutes;
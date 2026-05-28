import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller"; // Verifique se o nome do arquivo está em minúsculo
import { AuthMiddleware } from "../middlewares/auth.middleware";

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

const authRoutes = Router();

authRoutes.post('/registro', authController.registrar.bind(authController));
authRoutes.post('/login', authController.login.bind(authController));

authRoutes.get('/rotaProtegida', authMiddleware.authenticate, (req, res) => {
    res.json({ 
        message: "Você acessou uma rota protegida com sucesso!", 
        usuario: req.user 
    });
});


export default authRoutes;
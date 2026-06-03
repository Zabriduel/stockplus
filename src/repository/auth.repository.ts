import { db } from "../database/connection.database";
import { ILogin } from "../models/auth.login.models";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class LoginRepository {

    async findAll(): Promise<RowDataPacket[]> {
        const sql = `
            SELECT
                l.id_login,
                l.email,
                l.fk_id_pessoa,
                p.nome as nome_pessoa,
                l.fk_id_perfil,
                perf.tipo_perfil
            FROM logins l
            INNER JOIN pessoa p ON l.fk_id_pessoa = p.id_pessoa
            INNER JOIN perfil perf ON l.fk_id_perfil = perf.id_perfil;
        `;
        const [rows] = await db.execute<RowDataPacket[]>(sql);
        return rows;
    }

    async findByEmail(email: string): Promise<ILogin | null> {
        const sql = `
            SELECT
                id_login,
                email,
                senha,
                fk_id_pessoa,
                fk_id_perfil
            FROM logins
            WHERE email = ?
            LIMIT 1;
        `;
        const values = [email];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows.length > 0 ? (rows[0] as ILogin) : null;
    }

    async findByCpf(cpf: string): Promise<ILogin | null> {
        const sql = `
            SELECT
                l.id_login,
                l.email,
                l.senha,
                l.fk_id_pessoa,
                l.fk_id_perfil
            FROM logins l
            INNER JOIN clientes c ON l.fk_id_pessoa = c.fk_id_pessoa
            WHERE c.cpf = ?
            LIMIT 1;
        `;
        const values = [cpf];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows.length > 0 ? (rows[0] as ILogin) : null;
    }

    async findById(id: number): Promise<ILogin | null> {
        const sql = `
            SELECT
                id_login,
                email,
                senha,
                fk_id_pessoa,
                fk_id_perfil
            FROM logins
            WHERE id_login = ?
            LIMIT 1;
        `;
        const values = [id];
        const [rows] = await db.execute<RowDataPacket[]>(sql, values);
        return rows.length > 0 ? (rows[0] as ILogin) : null;
    }

    async create(
        email: string,
        senha: string,
        fk_id_pessoa: number,
        fk_id_perfil: number

    ): Promise<number> {
        const sql = `
            INSERT INTO logins (
                email,
                senha,
                fk_id_perfil,
                fk_id_pessoa
            ) VALUES (?, ?, ?, ?);
        `;
        
        const values = [email, senha, fk_id_perfil, fk_id_pessoa];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result.insertId;
    }

    async update(
        id: number,
        email: string,
        senha: string,
        fk_id_pessoa: number,
        fk_id_perfil: number
    ): Promise<ResultSetHeader> {
        const sql = `
            UPDATE logins
            SET
                email = ?,
                senha = ?,
                fk_id_pessoa = ?,
                fk_id_perfil = ?
            WHERE id_login = ?;
        `;
        const values = [email, senha, fk_id_pessoa, fk_id_perfil, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = `
            DELETE FROM logins
            WHERE id_login = ?;
        `;
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}
import { db } from '../database/connection.database'
import { IFornecedor } from '../models/fornecedor.models';
import { ResultSetHeader } from 'mysql2';

export class FornecedorRepository {
    async findAll(): Promise<IFornecedor[]> {
        const [rows] = await db.execute<IFornecedor[]>(
            'SELECT * FROM fornecedores;'
        );
        return rows;
    }
    async findById(idFornecedor: number): Promise<IFornecedor[]> {
        const sql = 'SELECT * FROM fornecedores WHERE id=?;';
        const values = [idFornecedor];
        const [rows] = await db.execute<IFornecedor[]>(sql, values);
        return rows;
    }
    async create(dados: Omit<IFornecedor, 'id'>): Promise<ResultSetHeader> {

        const sql = 'INSERT INTO fornecedores (nome_fantasia,cnpj) VALUES (?,?)';
        console.log(dados);
        const values = [dados._nomeFornecedor, dados._cnpj];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows

    }
    async update(id: number, dados: Omit<IFornecedor, 'id'>): Promise<ResultSetHeader> {

        const sql = 'UPDATE fonecedores SET nome_fantasia =?, cnpj=? WHERE id_fornecedor =?;';
        const values = [dados._nomeFornecedor, dados._cnpj, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;

    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM fornecedores WHERE id_fornecedor = ?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

}



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
        const sql = 'SELECT * FROM fornecedores WHERE id_fornecedor=?;';
        const values = [idFornecedor];
        const [rows] = await db.execute<IFornecedor[]>(sql, values);
        return rows;
    }
    async create(fornecedor: Omit<IFornecedor, 'id'>): Promise<ResultSetHeader> {

        const [resultPessoa] = await db.execute<ResultSetHeader>(
            `INSERT INTO pessoa (nome) VALUES (?)`,
            [fornecedor.Pessoa.Nome]
        );

        const idPessoa = resultPessoa.insertId;

        const sql = 'INSERT INTO fornecedores (cnpj, fk_id_pessoa) VALUES (?, ?)';
        const values = [fornecedor.Cnpj, idPessoa];

        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
    async update(id: number, dados: Omit<IFornecedor, 'id'>, idPessoa: number): Promise<ResultSetHeader> {
        await db.execute<ResultSetHeader>(`
            UPDATE pessoa
            SET nome = ?
            WHERE id_pessoa = ?;
        `, [dados.Pessoa.Nome, idPessoa]);


        const sql = 'UPDATE fornecedores SET cnpj=?, fk_id_pessoa=? WHERE id_fornecedor =?;';
        console.log(dados._cnpj, idPessoa, id);

        const values = [dados._cnpj, idPessoa, id];
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



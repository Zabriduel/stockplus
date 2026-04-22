import mysql, { Pool } from "mysql2/promise";
import { EnvVar } from "../config/EnvVar";

class Database {
  private static instance: Database;
  private pool!: Pool;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
      Database.instance.createPool();
    }
    return Database.instance;
  }

  private createPool(): void {
    this.pool = mysql.createPool({
      host: EnvVar.DB_HOST,
      user: EnvVar.DB_USER,
      password: EnvVar.DB_PASSWORD,
      database: EnvVar.DB_DATABASE,
      port: EnvVar.DB_PORT,
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0,
    });
  }

  public getPool(): Pool {
    return this.pool;
  }
}

export const db = Database.getInstance().getPool();




// import mysql, { Pool } from 'mysql2/promise';
// import { EnvVar } from '../config/EnvVar.ts';

// class Database {
//     private static instance: Database;
//     private pool!: Pool;

//     public static getInstance(): Database {
//         if (!Database.instance) {
//             Database.instance = new Database();
//             Database.instance.createPool();
//         }
//         return Database.instance
//     }

//     private createPool(): void {
//         this.pool = mysql.createPool({
//             host: EnvVar.DB_HOST,
//             user: EnvVar.DB_USER,
//             password: EnvVar.DB_PASSWORD,
//             database: EnvVar.DB_DATABASE,
//             port: EnvVar.DB_PORT,
//             waitForConnections: true,
//             connectionLimit: 100,
//             queueLimit: 0
//         });
//     }

//     public getPool(): Pool {
//         return this.pool;
//     }
// }

// export const db = Database.getInstance().getPool();




// export class Produto {
//     constructor(
//         private nome: string,
//         private valor: number,
//         private idCategoria: number,
//         private id?: number
//     ) {}

//     get Nome(): string {
//         return this.nome;
//     }

//     get Valor(): number {
//         return this.valor;
//     }

//     get IdCategoria(): number {
//         return this.idCategoria;
//     }

//     get Id(): number | undefined {
//         return this.id;
//     }
// }
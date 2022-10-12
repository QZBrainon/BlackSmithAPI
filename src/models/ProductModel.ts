import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import IProduct from '../interfaces';

class ProductModel {
  connection: Pool;

  constructor(conn:Pool) {
    this.connection = conn;
  }

  getAllProducts = async () => {
    const [result] = await this.connection
      .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.Products');
    return result;
  };

  insertProduct = async ({ name, amount }:IProduct) => {
    const [{ insertId }] = await this.connection
      .execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)', 
      [name, amount],
    );
    return insertId;
  };
}

export default ProductModel;
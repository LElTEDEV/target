import { useSQLiteContext } from "expo-sqlite";

export type TransactionCreate = {
  amount: number;
  target_id: number;
  observation?: string;
};

export type TransactionsReponse = {
  id: number;
  target_id: number;
  amount: number;
  observation: string;
  created_at: Date;
  updated_at: Date;
};

export function useTransactionDatabase() {
  const database = useSQLiteContext();

  async function create(data: TransactionCreate) {
    const statement = await database.prepareAsync(`
        INSERT INTO transactions 
            (target_id, amount, observation)
        VALUES
            ($target_id, $amount, $observation)    
    `);

    statement.executeAsync({
      $target_id: data.target_id,
      $amount: data.amount,
      $observation: data.observation ?? "",
    });
  }

  async function getTransactionsByDate(
    targetId: number,
  ): Promise<TransactionsReponse[]> {
    return await database.getAllAsync(`
      SELECT 
        * 
      FROM 
        transactions 
      WHERE
        target_id = ${targetId}
      ORDER BY
        created_at DESC
    `);
  }

  return { create, getTransactionsByDate };
}

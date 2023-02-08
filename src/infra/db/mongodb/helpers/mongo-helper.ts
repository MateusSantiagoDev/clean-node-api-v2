import { MongoClient } from 'mongodb'

// basicamente esse obj MongoHelper connecta e desconecta com o banco
export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}

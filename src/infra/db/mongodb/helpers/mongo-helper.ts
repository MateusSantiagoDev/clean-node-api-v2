import { MongoClient, Collection } from 'mongodb'

// basicamente esse obj MongoHelper connecta e desconecta com o banco
export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  // criar um método para expor uma collection e usa-la nos testes
  getCollection (name: string): Collection {
    // essa é a sintaxe para acessar uma colection do mongodb
    return this.client.db().collection(name)
  },

  // metodo generico para remover o underscore do ID
  mapper: (collection: any): any => {
    const { _id, ...collectionWiththoutId } = collection
    return Object.assign({}, collectionWiththoutId, { id: _id })
  }
}

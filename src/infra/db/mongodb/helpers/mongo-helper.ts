import { MongoClient, Collection } from 'mongodb'

// basicamente esse obj MongoHelper connecta e desconecta com o banco
export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  // criar um método para expor uma collection e usa-la nos testes
  async getCollection (name: string): Promise<Collection> {
    // se não tiver client ou se não estiver conectado realizo a conexão
    if (!this.client?.isConnected()) {
      await this.connect(this.url)
    }
    // essa é a sintaxe para acessar uma colection do mongodb
    return this.client.db().collection(name)
  },

  // metodo generico para remover o underscore do ID
  mapper: (collection: any): any => {
    const { _id, ...collectionWiththoutId } = collection
    return Object.assign({}, collectionWiththoutId, { id: _id })
  }
}

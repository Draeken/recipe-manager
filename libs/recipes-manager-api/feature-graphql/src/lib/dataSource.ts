import * as GCloudDS from '@google-cloud/datastore';
import { DataSource } from 'apollo-datasource';

const withKey = (entity) => ({ ...entity, id: JSON.stringify(entity[GCloudDS.Datastore.KEY]) });

export class DatastoreSource extends DataSource {
  private context;
  private store: GCloudDS.Datastore;

  constructor({ store }: { store: GCloudDS.Datastore }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAll() {
    const result = await this.store.runQuery(this.store.createQuery('languages'));
    return result[0].map(withKey);
  }

  async getOne(id: string) {
    const result = await this.store.get(JSON.parse(id));
    return withKey(result[0]);
  }

  async addLanguage(name: string) {
    const entity = {
      key: this.store.key('languages'),
      data: { name },
    };
    try {
      const [res] = await this.store.insert(entity);
      console.log('response', res);
      const id = entity.key.id;
      return {
        code: 200,
        success: true,
        language: { name, id },
      };
    } catch (e) {
      console.log('response error', e);
      return {
        code: 500,
        success: false,
        message: JSON.stringify(e),
      };
    }
  }
}

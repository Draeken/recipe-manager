import { DataSource } from 'apollo-datasource';
import GCloudDS = require('@google-cloud/datastore');

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
    const result = await this.store.runQuery(this.store.createQuery('language'));
    return result[0];
  }
}

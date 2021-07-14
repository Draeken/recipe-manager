import GCloudDS = require('@google-cloud/datastore');
import DataLoader = require('dataloader');

const datastore = new GCloudDS.Datastore();

export const createLoader = () =>
  new DataLoader<GCloudDS.Key, any, string>(
    async (keys) => {
      const results = await datastore.get(keys as GCloudDS.Key[]);
      // Sort resulting entities by the keys they were requested with.
      const entities = results[0];
      const entitiesByKey = {};
      entities.forEach((entity) => {
        entitiesByKey[JSON.stringify(entity[datastore.KEY])] = entity;
      });
      return keys.map((key) => entitiesByKey[JSON.stringify(key)] || null);
    },
    {
      // Datastore complex keys need to be converted to a string for use as cache keys
      cacheKeyFn: (key) => JSON.stringify(key),
    }
  );

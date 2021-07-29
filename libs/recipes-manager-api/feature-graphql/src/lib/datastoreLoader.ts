import GCloudDS = require('@google-cloud/datastore');
import DataLoader = require('dataloader');

export const createLoader = (store: GCloudDS.Datastore) =>
  new DataLoader<GCloudDS.Key, any, string>(
    async (keys) => {
      const results = await store.get(keys as GCloudDS.Key[]);
      // Sort resulting entities by the keys they were requested with.
      const entities = results[0];
      const entitiesByKey = {};
      entities.forEach((entity) => {
        entitiesByKey[JSON.stringify(entity[store.KEY])] = entity;
      });
      return keys.map((key) => entitiesByKey[JSON.stringify(key)] || null);
    },
    {
      // Datastore complex keys need to be converted to a string for use as cache keys
      cacheKeyFn: (key) => JSON.stringify(key),
    }
  );

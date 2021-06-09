// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/latest/guides/authentication
import { Datastore } from '@google-cloud/datastore';
import { RecipesManagerFeatureCreation } from '@recipes-manager/main-feature-creation';

// Creates a client
const datastore = new Datastore();

const getLanguages = () => {
  const query = datastore.createQuery('languages');
  return datastore.runQuery(query);
};

export async function getServerSideProps(context) {
  const [languages] = await getLanguages();
  return {
    props: {
      languages: languages.map((l) => {
        console.log(l);
        return { label: l.name, value: l[Datastore.KEY].id };
      }),
    },
  };
}

export default RecipesManagerFeatureCreation;

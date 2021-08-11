// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/latest/guides/authentication
import { Datastore } from '@google-cloud/datastore';
import { RecipesManagerFeatureCreation } from '@recipes-manager/main-feature-creation';

export default RecipesManagerFeatureCreation;

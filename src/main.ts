import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {
  buildDeviceUses,
  DEVICE_KEY,
  buildLoanRecordUses,
  LOAN_RECORD_KEY,
} from './config/appServices';
import { initAuth0 } from './composables/use-auth';

import './styles/main.css';
import './styles/font-face.css';

async function bootstrap() {
  // 1. Initialise Auth0 FIRST
  await initAuth0();

  // 2. Create ONE app
  const app = createApp(App);

  // 3. Register plugins
  app.use(router);

  // 4. Register DI providers
  app.provide(DEVICE_KEY, buildDeviceUses());
  app.provide(LOAN_RECORD_KEY, buildLoanRecordUses());

  // 5. Mount
  app.mount('#app');
}

bootstrap();

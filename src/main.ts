import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {
  buildDeviceUses,
  DEVICE_KEY,
  buildLoanRecordUses,
  LOAN_RECORD_KEY,
} from './config/appServices';
import './styles/global.css';

const app = createApp(App);

app.use(router);

// Provide bound review use cases to the app's DI container
app.provide(DEVICE_KEY, buildDeviceUses());
app.provide(LOAN_RECORD_KEY, buildLoanRecordUses());

app.mount('#app');

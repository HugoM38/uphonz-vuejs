import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import vuetify from './plugins/vuetify';

console.log('main.ts');
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');
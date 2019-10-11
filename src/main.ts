import AppComponent from './app';
import { Vue } from 'vue-property-decorator';
import TodoAppComponent from './components/todo-app';

Vue.component('todo-app', TodoAppComponent);

new AppComponent({ el: '#app' });
import { Component, Vue } from 'vue-property-decorator';
import './todo-app.scss';

@Component({
    template: require('./todo-app.html')
})
export default class TodoAppComponent extends Vue {
    teste = 'oi';
}
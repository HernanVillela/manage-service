import params from './component/cli.component.js';
import App from './component/app.component.js';

(async (params) => {
    let app = new App(params);
    console.log(`Running instance`, params);
    await app.launch();
})(params);
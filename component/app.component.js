import launch from './launching.component.js'

export default class app {

    constructor(params){
        this.params = params
    }

    launch = () => {
        if(launch[this.params.type]){
            launch[this.params.type](this.params)
        }else{
            throw new Error(`not configured launching`);
        }
    }
}
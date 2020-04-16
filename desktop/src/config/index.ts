import { environment} from '../environments/environment'
import {config as dev} from './config.dev'
import {config as prod} from './config.prod'
import {config as prodTestServer} from './config.prod.testserver'
import {config as mock} from './config.mock'

let config = ((env) => {
    switch (env) {
        case 'dev':
            return dev;
        case 'mock':
            return mock;
        case "prod:testserver": 
            return prodTestServer
        default:
            return prod;
    }
})(environment.env)


export {
    config
}



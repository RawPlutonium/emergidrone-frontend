import {Stitch} from 'mongodb-stitch-browser-sdk';

//initialize a stitch app
function initializeApp(){
    const appId = 'emergidrone-bjasg';
    const client = Stitch.hasAppClient(appId) ?
                    Stitch.getAppClient(appId) :
                    Stitch.initializeAppClient(appId);
    return {
        client
    }
}

export default initializeApp;
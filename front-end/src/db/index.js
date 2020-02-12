import {RemoteMongoClient} from 'mongodb-stitch-browser-sdk';
import initializeApp from '../app';
import {trackPromise} from 'react-promise-tracker';

export const useDb = () => {
    const {client} = initializeApp();

    const mongodb = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
    const usersCollection = mongodb.db('emergidrone').collection('users');

    const usersDb = {
        save: (user) => {
            return trackPromise(
                usersCollection.insertOne(user), 'save_user'
            );
        },
        exists: (_id) => {
            return usersCollection.findOne({_id});
        }
    }

    return {
        usersDb
    }
}


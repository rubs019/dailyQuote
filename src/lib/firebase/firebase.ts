import * as admin from 'firebase-admin'
import serviceAccount from './dayliquote-f06e9f5facde.json'

class AdminFirebase {
    public db
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
        this.db = admin.firestore()
    }
}

export const Firebase = new AdminFirebase()

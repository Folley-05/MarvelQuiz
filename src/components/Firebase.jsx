import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const Config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
  };


class Firebase {

    constructor() {
        app.initializeApp(Config)
        this.auth=app.auth()
        this.db=app.firestore()
    }

    //methode d'inscription
    signUpUser=(email, password)=>this.auth.createUserWithEmailAndPassword(email, password)
    

    // methode de connection
    loginUser=(email, password)=>this.auth.signInWithEmailAndPassword(email, password)

    //methode de deconnexion
    signOutUser=()=>this.auth.signOut()

    //recuperer le mot de passe
    passwordReset=email=>this.auth.sendPasswordResetEmail(email)

    //gestion de la base de donnees
    user=userId=>this.db.doc('Users/'+userId)

}

export default Firebase
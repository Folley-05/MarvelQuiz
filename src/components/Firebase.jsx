import app from 'firebase/app'
import 'firebase/auth'

const Config = {
    apiKey: "AIzaSyCmBWpifpI6zFgJ3N92zEwQ313mE_Jt-to",
    authDomain: "marvel-quiz-8b723.firebaseapp.com",
    databaseURL: "https://marvel-quiz-8b723.firebaseio.com",
    projectId: "marvel-quiz-8b723",
    storageBucket: "marvel-quiz-8b723.appspot.com",
    messagingSenderId: "456781740113",
    appId: "1:456781740113:web:3c5e9615e339f39ef22070"
  };


class Firebase {

    constructor() {
        app.initializeApp(Config)
        this.auth=app.auth()
    }

    //methode d'inscription
    signUpUser=(email, password)=>this.auth.createUserWithEmailAndPassword(email, password)
    

    // methode de connection
    loginUser=(email, password)=>this.auth.signInWithEmailAndPassword(email, password)

    //methode de deconnexion
    signOutUser=()=>this.auth.signOut()


}

export default Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCq9FzEc9cOfXtv1yRKWDAPo8khtPyuM1Q",
    authDomain: "adminbd-registros2.firebaseapp.com",
    projectId: "adminbd-registros2",
    storageBucket: "adminbd-registros2.appspot.com",
    messagingSenderId: "771523272061",
    appId: "1:771523272061:web:cf136f55b3bd0f3e0d4014"
};

firebase.initializeApp(firebaseConfig);

observador();

function observador(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        var email = user.email;
        console.log("Login de idUsuario: ",uid, ", email: ",email);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("Usuario sin iniciar sesion");
      }
    });
}

function registrar(){
    console.log("Clic en registrar");

    var email = document.getElementById('emailI').value;
    var password = document.getElementById('passwordI').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        // Signed in
        // ...
        verificar();
        console.log("Usuario registrado");
        alert("¡Se ha registrado con exito!");
        window.location.reload();
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function verificar(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        // Email sent.
        console.log("email enviado");
    }).catch(function(error) {
        // An error happened.
        console.log("error al mandar email");
    });
}

function ingresar(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
    // Signed in
    // ...
        console.log("Ha iniciado sesion");
        window.location.href = "registros.html";
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function cerrarSesion(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "index.html";
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}
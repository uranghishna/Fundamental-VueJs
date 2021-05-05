// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA6i6Zw9Xyxcn-0toSEYt9aGt7rBcZ0X8s",
    authDomain: "vuejs-dasar.firebaseapp.com",
    databaseURL: "https://vuejs-dasar-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vuejs-dasar",
    storageBucket: "vuejs-dasar.appspot.com",
    messagingSenderId: "889937485511",
    appId: "1:889937485511:web:78e9f1696ede3186fd28e2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database()
const kelasRef=database.ref('kelas')
import firebase from 'firebase'

class Fire {
  constructor() {
    this.init()
    this.checkAuth()
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyA9rWISHr77dtw5qcHlhIwVd9lBJ4OcuH4",
        authDomain: "videoapp-7c9ca.firebaseapp.com",
        databaseURL: "https://videoapp-7c9ca.firebaseio.com",
        projectId: "videoapp-7c9ca",
        storageBucket: "videoapp-7c9ca.appspot.com",
        messagingSenderId: "894651367574",
        appId: "1:894651367574:web:c3b701c5f32f03839ac2b7",
        measurementId: "G-W4C0P9RX7Z"

      })
    }
  }

checkAuth = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      firebase.auth().signInAnonymously()
    }
  })
}

send = messages => {
  console.log("messages", messages)
  messages.forEach(item => {
    const message = {
      text: item.text,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: item.user
    }    
    this.db.push(message)
  });
}

parse = message => {
  const {user, text, timestamp} = message.val()
  const {key: _id} = message
  const createdAt = new Date(timestamp)

  return {
    _id, createdAt, text, user
  }
}

get = callback => {
  this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
}

off() {
  this.db.off()
}

get db() {
  return firebase.database().ref("messages")
}

get uid() {
  return  (firebase.auth().currentUser || {}).uid
}

}

export default new Fire()
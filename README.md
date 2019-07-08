## Vue Task list with Firebase and Google Auth

[![](https://user-images.githubusercontent.com/22861012/60805835-00a6c900-a18a-11e9-90bb-b0a815346b20.png)](https://user-images.githubusercontent.com/22861012/60805835-00a6c900-a18a-11e9-90bb-b0a815346b20.png)

### Project setup

1. **Install dependencies**
```
npm install
```
2. Go to [firebase.google.com](https://firebase.google.com/ "firebase.google.com") and register new **Web** app.

3.  Open **main.js**

4.  Enter keys inside *config*
```javascript
    const config = {
      apiKey: "XXXX",
      authDomain: "XXXXXX.firebaseapp.com",
      databaseURL: "https://XXXX.firebaseio.com",
      projectId: "XXXX",
      storageBucket: "XXX.appspot.com",
      messagingSenderId: "XXXXXX"
    };
```
5.  Open [Console](https://console.firebase.google.com "Console") and goto **Authentication**. Turn on Google account.

6. Run
```
npm run serve
```
7. Open [http://localhost:8080](http://localhost:8080 "http://localhost:8080")

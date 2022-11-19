//TODO: https://firebase.google.com/docs/firestore/quickstart

import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

@Injectable()
export class FirebaseService {

  app: any;
  db: any;

  constructor(private http: HttpClientModule) {
    const firebaseConfig = {
      apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      authDomain: "xxxxxxxxxxxxx.firebaseapp.com",
      projectId: "xxxxxxxxxxxxxx",
      storageBucket: "xxxxxxxxxxxx.appspot.com",
      messagingSenderId: "xxxxxxxxxxxx",
      appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      measurementId: "xxxxxxxxxxxx"
    };

    this.app = initializeApp(firebaseConfig);

    this.db = getFirestore(this.app);

  }

  async saveAda() {
    try {
      const docRef = await addDoc(collection(this.db, "teststore"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}

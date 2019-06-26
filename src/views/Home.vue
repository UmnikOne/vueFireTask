<template>
<div>
  <b-row style="padding-top: 20px; padding-bottom: 20px;">
    <b-col>
      <b-card>
        <b-card-text>
          <div><b>Add ToDo task</b></div>
          <br>
          <b-form-input v-model="task" placeholder="Enter task"></b-form-input>
          <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select><br>
          <div class="text-right">
            <b-button @click="push()" id="nextline" size="sm">Add task</b-button>
          </div>
          <hr>
          <li v-for="(expense, index) in tasks" :key="index">
                    {{expense.task}}
          </li>
          Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
          content.
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a href="#" class="card-link">Card link</a>
        <b-link href="#" class="card-link">Another link</b-link>
      </b-card>
    </b-col>
    <b-col>
      <b-card title="Card title" sub-title="Card subtitle">
        <b-card-text>
          Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
          content.
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a href="#" class="card-link">Card link</a>
        <b-link href="#" class="card-link">Another link</b-link>
      </b-card>
    </b-col>
  </b-row>
  <center>
      {{ this.username }} - <router-link to="/setting">Setting</router-link> - <a href="#" @click="logout">Logout</a>
  </center>
</div>  
</template>

<script>
import firebase from 'firebase';
import { db } from '../main'

export default {
  name: 'home',
  data() {
    return {
      username: '',
      user:'',
      task: '',
      selected: null,
      tasks: [],
      options: [
        { value: null, text: 'Please select type' },
        { value: 'daily', text: 'Daily' },
        { value: 'monthly', text: 'Monthly' },
        { value: 'global', text: 'Global' },
      ],
    };
  },
  firestore () {
    return {
      tasks: firebase.collection('tasks'),
    };
  },
  created() {
    this.user = firebase.auth().currentUser;
    this.tasks = db.collection('tasks').get();

    db.collection('tasks').get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    console.log(this.tasks);
    if (this.user.displayName) {
      this.username = this.user.displayName;
    } else {
      this.username = 'Guest'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    push() {
      const createdAt = new Date();
      db.collection('tasks').add({ user: this.user.email, task: this.task, type: this.selected, createdAt: createdAt });
    },
  }
}
</script>

<style>
#nextline {
  margin-bottom: 5px;
  margin-top: 10px;
}
</style>
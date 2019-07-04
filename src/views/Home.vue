<template>
<div>
  <b-row style="padding-top: 20px; padding-bottom: 20px;">
    <b-col>
      <b-card>
        <b-card-text>


        <div>
          <b-tabs content-class="mt-3" align="center">
            <b-tab title="Daily" active>
              <el-checkbox-group v-model="checkList">
                <div v-for="(expense, index) in tasks" :key="index">
                  <el-checkbox v-if="expense.end !== true" :label="expense.task" border @click="updateItem(expense['.key'])">
                  {{ expense.task }} - 111233
                  <i  @click="deleteItem(expense['.key'])" class="el-icon-delete"></i>
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </b-tab>
            <b-tab title="Monthly"><p>I'm the second tab</p></b-tab>
            <b-tab title="Global"><p>I'm the second tab</p></b-tab>
            <b-tab title="Ends Tasks">
              <el-checkbox-group>
                <div v-for="(expense, index) in tasks" :key="index">
                  <el-checkbox v-if="expense.end == true" v-model="checked" :label="expense.task" border disabled size="medium">
                    <p style="text-decoration: line-through;">{{ expense.task }} - 111233</p>
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </b-tab>
            <b-tab title="Add task">
              <div>
                <b-jumbotron>
                  <b-form-input v-model="task" placeholder="Enter task"></b-form-input>
                  <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
                  <br><br>
                  <el-date-picker
                    v-model="daypick"
                    type="date"
                    placeholder="You can select day"
                    style="margin-right: 9px;">
                  </el-date-picker>
                  <el-time-select
                    v-model="timepick"
                    :picker-options="{
                      start: '05:00',
                      step: '00:15',
                      end: '23:45'
                    }"
                    placeholder="You can select time">
                  </el-time-select>
                  <br><br>
                  <el-input
                    size="small"
                    placeholder="You can add URL"
                    v-model="input3">
                  </el-input>

                  <div class="text-right">
                    <b-button @click="push()" id="nextline" size="sm">Add task</b-button>
                  </div>
                </b-jumbotron>
              </div>
            </b-tab>
          </b-tabs>
        </div>

        </b-card-text>
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
import { db, firestore } from '../main'

export default {
  name: 'home',
  data() {
    return {
      username: '',
      user:'',
      task: '',
      daypick: '',
      timepick: '',
      selected: 'daily',
      tasks: [],
      checked: true,
      activeName: 'first',
      options: [
        { value: 'daily', text: 'Daily' },
        { value: 'monthly', text: 'Monthly' },
        { value: 'global', text: 'Global' },
      ],
      checkList: [],
      endList: [],
    };
  },
  firestore () {
    return {
      tasks: firestore.collection('tasks').orderBy('createdAt', 'desc'),
    };
  },
  created() {
    this.user = firebase.auth().currentUser;

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
    deleteItem(key) {
      db.collection('tasks').doc(key).delete();
    },
    updateItem(key) {
      db.collection('tasks').doc(key).update({end: true});
    },
  }
}
</script>

<style>
#nextline {
  margin-bottom: 5px;
  margin-top: 10px;
}
.el-checkbox.is-bordered.el-checkbox--medium {
  width: 100%;
  margin-left: 0px !important;
}
.el-checkbox:last-child {
  width: 100%;
}
.el-checkbox__label {
  font-size: 16px;
}
</style>
<template>
  <div>
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
            <div v-for="(expense, index) in tasks" :key="index">
              <el-button v-if="expense.end == true" id="end_task" disabled>{{ expense.task }}</el-button>
            </div>
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
    <div id="footer">
      <center>
        {{ this.username }} - <router-link to="/setting">Change name</router-link> - <a href="#" @click="logout">Logout</a>
      </center>
    </div>
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

  #footer{
    margin-top: 20px;
  }

  #end_task {
    text-decoration: line-through;
    width: 100%;
    margin-bottom: 20px;
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
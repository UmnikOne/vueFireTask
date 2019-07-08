<template>
  <div>
    <b-card>
      <b-card-text>
      <div>
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="Daily" active>
            <div v-for="(expense, index) in tasks" :key="index">
              <div v-if="expense.end !== true && expense.type === 'daily'" class="task">
                <el-button  @click="updateItem(expense['.key'])" type="success" id="complete" icon="el-icon-check" size="mini"></el-button>
                <i @click="deleteItem(expense['.key'])" id="delete" class="el-icon-delete"></i>
                {{ expense.task }}
                <br v-if="expense.day || expense.time">
                <small v-if="expense.day" style="margin-right: 10px;">{{  new Date(expense.day.toDate()).toDateString() }}</small> <small v-if="expense.time">{{ expense.time }}</small>
                <small v-if="expense.url"><br><a :href="expense.url" class="link" target="_blank"> {{ expense.url }} </a></small>
              </div>
            </div>
          </b-tab>
          <b-tab title="Monthly">
            <div v-for="(expense, index) in tasks" :key="index">
              <div v-if="expense.end !== true && expense.type === 'monthly'" class="task">
                <el-button  @click="updateItem(expense['.key'])" type="success" id="complete" icon="el-icon-check" size="mini"></el-button>
                <i @click="deleteItem(expense['.key'])" id="delete" class="el-icon-delete"></i>
                {{ expense.task }}
                <br v-if="expense.day || expense.time">
                <small v-if="expense.day" style="margin-right: 10px;">{{  new Date(expense.day.toDate()).toDateString() }}</small> <small v-if="expense.time">{{ expense.time }}</small>
                <small v-if="expense.url"><br><a :href="expense.url" class="link" target="_blank"> {{ expense.url }} </a></small>
              </div>
            </div>
          </b-tab>
          <b-tab title="Global">
            <div v-for="(expense, index) in tasks" :key="index">
              <div v-if="expense.end !== true && expense.type === 'global'" class="task">
                <el-button  @click="updateItem(expense['.key'])" type="success" id="complete" icon="el-icon-check" size="mini"></el-button>
                <i @click="deleteItem(expense['.key'])" id="delete" class="el-icon-delete"></i>
                {{ expense.task }}
                <br v-if="expense.day || expense.time">
                <small v-if="expense.day" style="margin-right: 10px;">{{  new Date(expense.day.toDate()).toDateString() }}</small> <small v-if="expense.time">{{ expense.time }}</small>
                <small v-if="expense.url"><br><a :href="expense.url" class="link" target="_blank"> {{ expense.url }} </a></small>
              </div>
            </div>
          </b-tab>
          <b-tab title="Ends Tasks">
            <div v-for="(expense, index) in tasks" :key="index">
              <div v-if="expense.end == true" class="task">
                {{ expense.task }}
                <br v-if="expense.day || expense.time">
                <small v-if="expense.day" style="margin-right: 10px;">{{  new Date(expense.day.toDate()).toDateString() }}</small> <small v-if="expense.time">{{ expense.time }}</small>
                <small v-if="expense.url"><br><a :href="expense.url" class="link" target="_blank"> {{ expense.url }} </a></small>
              </div>
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
                  v-model="url">
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
        {{ this.username }}  - <a href="#" @click="logout">Logout</a>
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
      url: '',
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
      tasks: firestore.collection('tasks').where('user', '==', firebase.auth().currentUser.email),
    };
  },
  created() {
    this.user = firebase.auth().currentUser;

    if (this.user.displayName) {
      this.username = this.user.email;
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
      db.collection('tasks').add({ user: this.user.email, task: this.task, type: this.selected, day: this.daypick, time: this.timepick, url: this.url, createdAt: createdAt });
      this.$message({
          message: 'Congrats, you added new task.',
          type: 'success'
        });
      this.task = "";
    },
    deleteItem(key) {
      this.$confirm('This will permanently delete this task. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          db.collection('tasks').doc(key).delete();
        });
    },
    updateItem(key) {
      this.$confirm('Want you complete this task?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          db.collection('tasks').doc(key).update({end: true});
        });
    },
  }
}
</script>

<style>
  .task {
    margin: 10px;
    padding: 6px;
    padding-left: 15px;
    border: 1px solid #d7dae2;
    border-radius: 4px;
    font-size: 14px;
    color: #606266;
    font-weight: 500;
  }
  #nextline {
    margin-bottom: 5px;
    margin-top: 10px;
  }

  #footer{
    margin-top: 20px;
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

  #complete {
    position: absolute;
    right: 35px;
    margin-top: -3px;
    color: white;
  }

  #delete {
    position: absolute;
    right: 10px;
    margin-top: 3px;
    color: red;
  }

  .link {
    text-overflow: ellipsis;
    width: 200px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
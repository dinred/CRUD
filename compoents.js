// Vue.component("input-name", {
//   data() {
//     return {
//       name: "",
//     };
//   },
//   template: `
//     <div>
//         name:
//         <input type="text" v-model="name" />
//         <button
//             type="button"
//             @click="submit"
//         >
//             Submit
//         </button>
//     </div>
//   `,
//   methods: {
//     submit() {
//       this.$emit("submit", {
//         name: this.name,
//         isFinished: false,
//       });
//       this.name = "";
//     },
//   },
// });

// Vue.component("data-list", {
//   props: {
//     list: {
//       type: Array,
//       required: true,
//     },
//   },
//   template: `
//         <ul>
//             <li v-for="(data, index) in list" @click="toFinish(index)">
//                 <span v-if="!data.isFinished">{{ data.name }}</span>
//                 <span v-else><s>{{ data.name }}</s></span>
//             </li>
//         </ul>
//     `,
//   methods: {
//     toFinish(i) {
//       this.$emit("finish", i);
//     },
//   },
// });

// Vue.component("todo-list", {
//   data() {
//     return {
//       list: [
//         {
//           name: "first thing",
//           isFinished: false,
//         },
//       ],
//     };
//   },
//   template: `
//     <div>
//         <h1>TODO LIST</h1>
//         <input-name @submit="addTodo" />
//         <data-list :list="list" @finish="finish"/>
//     </div>
//     `,
//   methods: {
//     addTodo(data) {
//       this.list.push(data);
//     },
//     finish(index) {
//       this.list[index].isFinished = true;
//     },
//   },
// });

Vue.component("main-list", {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "first thing",
          birthday: "09/18",
          status: true,
          isEdit: false,
          isNew: false,
        },
        {
          id: 3,
          name: "first thing",
          birthday: "09/18",
          status: false,
          isEdit: false,
          isNew: false,
        },
      ],
      tmpData: {},
      isEditing: false,
      isNewing: false,
    };
  },
  template: `
    <div>
        <h1>database Student</h1>
        <button 
          type="button" 
          @click="createData"
          :disabled="isBuzy"
        >
        createData
        </button>
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Birthday</th>
              <th>Status</th>
              <th>
                  action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(x,index) in list">
              <td>{{index + 1}}</td>
              <td>{{x.id}}</td>
              <td>
                <span v-if="x.isNew || x.isEdit">
                  <input type="text" v-model="x.name">
                </span>
                <span v-else>
                  {{x.name}}
                </span>
              </td>
              <td>
                <span v-if="x.isNew || x.isEdit">
                  <input type="text" v-model="x.birthday">
                </span>
                <span v-else>
                 {{x.birthday}}
                </span>
              </td>
              <td >
                <span v-if="x.isNew || x.isEdit">
                  <label>Yes<input type="radio" :value="true" v-model="x.status" /></label>
                  <label>No<input type="radio" :value="false" v-model="x.status" /></label>
                </span>
                <span v-else>
                  <span v-if="x.status"> Yes</span>
                  <span v-else> No</span>
                </span>
              </td>
              <td>
                <span v-if="x.isNew">
                  <button type="button" @click="create(x)">create</button>
                  <button type="button" @click="cancel(x.id)">cancel</button>
                </span>
                <span v-else-if="x.isEdit">
                  <button type="button" @click="update(x)">update</button>
                  <button type="button" @click="cancel(x.id)">cancel</button>
                </span>
                <span v-else>
                  <button type="button" @click="edit(x)" :disabled="isBuzy">edit</button>
                  <button type="button" @click="del(x.id)">del</button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  methods: {
    createData() {
      this.list.push({
        id: Math.max(...this.list.map((x) => x.id)) + 1,
        isNew: true,
        isEdit: false,
      });
      this.isNewing = true;
    },
    create(data) {
      data.isNew = false;
      this.isNewing = false;
    },
    edit(data) {
      // console.log(data);
      // console.log(typeof JSON.parse(JSON.stringify(data)));
      this.tmpData = JSON.parse(JSON.stringify(data));
      data.isEdit = true;

      this.isEditing = true;
    },
    update(x) {
      x.isEdit = false;
      this.isEditing = false;
    },
    cancel(id) {
      this.list.splice(
        this.list.findIndex((student) => student.id == id),
        1,
        this.tmpData
      );

      this.isEditing = false;
      this.isNewing = false;
    },
    del(id) {
      // console.log("a");
      // //   console.log(index);
      // console.log("B");
      var index = this.list.findIndex((student) => student.id == id);
      //   var index = this.list.findIndex(function (student) {
      //     return student.id == id;
      //     // if(student.id==id){
      //     //     // this.list.splice(id,1)
      //     //     return true
      //     // }else{
      //     //     return false
      //     // }
      //   });
      console.log(index);
      this.list.splice(index, 1);

      //   for (var i = 0; i < this.list.length; i++) {
      //     var x = this.list[i];
      //     if (id == x.id) {
      //       this.list.splice(i, 1);
      //       console.log(i);
      //       break;
      //     }
      //   }
      //   this.list.splice(id, 1);
    },
  },
  computed: {
    isBuzy() {
      return this.isEditing || this.isNewing;
    },
  },
});

// Vue.component("edit-list", {
//   props: {
//     list: {
//       type: Array,
//     },
//   },
//   template: `
//         <div>
//           <table>
//                 <tr>
//                 <td>12</td>
//                 </tr>
//           </table>
//         </div>
//     `,
//   methods: {
//     edit(i) {
//       console.log("A");
//     },
//     toFinish(i) {
//       this.$emit("finish", i);
//     },
//   },
// });

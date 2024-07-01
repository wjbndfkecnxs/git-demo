<!-- 根据老师上课评价的另一个作业的基础上修改的
那位同学的作业是点击编辑在原有的信息上加以修改
我的代码在此基础上完善了 在新增的情况下也可以在列表新增一行进行修改
没有借鉴那位同学的代码 只是借鉴了灵感 -->
<template>
  <div class="text-left">
    <h1 class="text-center">同学列表</h1>
    <div class="flex justify-end">
      <button class="bg-gray-400" type="primary" @click="addUser">新增</button>
    </div>
    <ul>
      <li>
        <span class="No">序号</span>
        <span class="study-code">学号</span>
        <span class="name">姓名</span>
        <span class="year">年龄</span>
        <div class="operation">操作</div>
      </li>
      <li v-for="(item, index) in userList" :key="item?.id">
        <template v-if="editIndex === index">
          <span class="No">{{ index + 1 }}.</span>
          <span class="study-code"><input type="text" v-model="studyNum" placeholder="输入学号"></span>
          <span class="name"><input type="text" v-model="name" placeholder="输入姓名"></span>
          <span class="year"><input type="text" v-model="year" placeholder="输入年龄"></span>
          <div class="operation">
            <button @click="submitFn">确定</button>
            <button @click="cancelEdit">取消</button>
          </div>
        </template>
        <template v-else>
          <span class="No">{{ index + 1 }}.</span>
          <span class="study-code">{{ item.id }}</span>
          <span class="name">{{ item.userName }}</span>
          <span class="year">{{ item.age }}</span>
          <div class="operation">
            <button @click="deleteUser(index)">删除</button>
            <button @click="editUser(index)">编辑</button>
            <button @click="getYourName(item.id)">问名字</button>
          </div>
        </template>
      </li>
      <li v-if="showFlag && editIndex === -1">
        <span class="No">{{ userList.length + 1 }}.</span>
        <span class="study-code"><input type="text" v-model="studyNum" placeholder="输入学号"></span>
        <span class="name"><input type="text" v-model="name" placeholder="输入姓名"></span>
        <span class="year"><input type="text" v-model="year" placeholder="输入年龄"></span>
        <div class="operation">
          <button @click="submitFn">确定</button>
          <button @click="cancelFn">取消</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from '../store/user';

const userStore = useUserStore();
const { userList } = storeToRefs(userStore);

let showFlag = ref(false);
let editIndex = ref(-1);

let studyNum = ref('');
let name = ref('');
let year = ref('');

const deleteUser = index => {
  userStore.userList.splice(index, 1);
};

const addUser = () => {
  editIndex.value = -1;
  showFlag.value = true;
  // 清空输入框内容
  studyNum.value = '';
  name.value = '';
  year.value = '';
};

const editUser = index => {
  editIndex.value = index;
  const item = userStore.userList[index];
  if (item) {
    studyNum.value = item.id.toString(); // 确保学号以字符串形式显示
    name.value = item.userName;
    year.value = item.age;
    showFlag.value = false;
  }
};

const checkList = (code) => {
  return userStore.userList.some(element => element.id === code);
};

const addNum2name = (name) => {
  let newName = name;
  let num = 1;
  while (userStore.userList.some(item => item.userName === newName)) {
    newName = `${name}${num}`;
    num++;
  }
  return newName;
};

const submitFn = () => {
  let studyNumCheck = isNum(studyNum.value);
  if (!studyNumCheck) {
    alert('学号需要是纯数字');
    return;
  }
  
  let tempName = name.value;
  if (editIndex.value === -1) { // 新增模式下才处理名字重复
    tempName = addNum2name(tempName);
    
    // 检查学号是否已存在
    let isStudyNumExist = checkList(studyNum.value);
    if (isStudyNumExist) {
      alert('学号已存在');
      return;
    }
  }
  
  if (editIndex.value !== -1) {
    // 更新当前项并移动到第一个位置
    const updatedItem = {
      id: studyNum.value,
      userName: tempName,
      age: year.value
    };
    
    userStore.userList.splice(editIndex.value, 1);
    userStore.userList.unshift(updatedItem);
  } else {
    // 新增项放在第一个位置
    userStore.userList.unshift({
      id: studyNum.value,
      userName: tempName,
      age: year.value
    });
  }
  showFlag.value = false;
  editIndex.value = -1;
};

const cancelFn = () => {
  showFlag.value = false;
};

const cancelEdit = () => {
  editIndex.value = -1;
};

const getYourName = id => {
  const student = userStore.userList.find(item => item.id === id);
  alert(student.userName);
};

const isNum = (val) => {
  let exg = /^\d+$/;
  return exg.test(val);
};
</script>

<style lang="less" scoped>
.tool-bar {
  display: flex;
  justify-content: flex-end;
  .add-btn {
    background-color: rgba(42, 46, 54, 0.48);
    color: #ffffff;
    width: 90px;
    margin-right: 24px;
  }
}
ul {
  padding-left: 0;
  padding: 0 24px;
  text-align: center;
}
li {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  &:nth-child(1) {
    color: aliceblue;
    background-color: rgba(42, 46, 54, 0.48);
  }
  .No {
    width: 18%;
  }
  .study-code {
    width: 18%;
  }
  .name {
    width: 18%;
  }
  .year {
    width: 18%;
  }
  .operation {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    & > button {
      background-color: #314659;
      color: #ffffff;
      width: 90px;
    }
  }
}
li input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
 export const useUserStore = defineStore('user', () => {
    let userName = ref('张三111');
    let userList = reactive([
      {
        id: '19761128',
        userName: '温尚翊',
        age: 18
      },{
          id: '19751211',
          userName: '石锦航',
          age: 19
      },{
          id: '19770425',
          userName: '蔡昇晏',
          age: 17
      },{
          id: '19730728',
          userName: '刘谚明',
          age: 18
      }]);

    // const setUserName = (newName) => {
    //     userName.value = newName;
    // };

    const setUserList = (List) => {
        userList = List;
    };

    return {
        // userName,
        userList,
        // setUserName,
        setUserList
    };
 });
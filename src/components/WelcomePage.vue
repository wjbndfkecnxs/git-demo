<template>
  <div class="welcome-page">
    <h1>欢迎来到同学列表页面</h1>
    <router-link to="/ClassmateList">
      <button class="bg-gray-400">查看同学列表</button>
    </router-link>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goToClassmates = () => {
  router.push('/ClassmateList');
};
</script>


<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #ccc;
  color: #fff;
}
</style>

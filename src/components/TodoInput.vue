<template>
  <header class="header">
    <h1>todos</h1>
    <base-input
      v-model="content"
      class="new-todo"
      @blur="makeTodo"
      placeholder="What needs to be done?"
      @keyup.enter="makeTodo" 
      v-on="$listeners" 
      :autofocus="true" />
  </header>
</template>

<script>
import BaseInput from './BaseInput.vue';

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('todo')

export default {
  name: 'TheHeader',
  components: { BaseInput },
  data: function(){
    return {
      content: ''
    }
  },
  methods: {
    ...mapMutations(['addTodo']),
    
    makeTodo(){

      if(this.content.trim().length === 0) return;
      
      this.addTodo(this.content);

      this.content = '';
    }
  }
};
</script>

<style>
</style>

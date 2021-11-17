<template>
  <header class="header">
    <h1>todos</h1>
    <base-input
      v-model="content"
      class="new-todo"
      placeholder="What needs to be done?"
      :autofocus="true"
      @blur="addNewTodo" 
      @keyup.enter="addNewTodo" 
      v-on="$listeners"
    />
  </header>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue';

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('todo');

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
    
    addNewTodo(){
      
      if(this.content === '') return;

      this.addTodo(this.content);

      this.content = '';
    }
  }
};
</script>

<style>
</style>

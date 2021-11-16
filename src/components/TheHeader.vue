<template>
  <header class="header">
    <h1>todos</h1>
    <base-input
      v-model="content"
      @blur="addTodo"
      @keyup.enter="addTodo"
      v-on="$listeners"
      class="new-todo" 
      placeholder="What needs to be done?" 
      :autofocus="true">
    </base-input>
  </header>
</template>

<script>
import BaseInput from './BaseInput.vue';
/*
  TODO: https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
  = 1번 vs. 2번
*/
export default {
  name: 'TheHeader',
  components: { BaseInput },
  data: function(){
    return {
      content: ''
    }
  },
  methods: {
    // TODO: 이렇게 입력 처리해도 괜찮은지 확인 필요
    addTodo: function(){
      
      if(this.content.trim().length === 0) return;
      
      this.$store.commit({
        type: 'todo/ADD_TODO',
        content: this.content
      });

      this.content = '';
    }
  },

};
</script>

<style>
</style>

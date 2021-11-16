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

export default {
  name: 'TheHeader',
  components: { BaseInput },
  computed: {
    content: {
      get(){
        return this.$store.state.todo.content;
      },
      set(content){

        this.$store.commit({
          type: 'todo/updateTodo',
          content
        });

      }
    }
  },
  methods: {
    addTodo(){

      if(this.content.trim().length === 0) return;

      this.$store.commit({
        type: 'todo/addTodo',
        content: this.content
      });

      this.content = '';
    }
  }
};
</script>

<style>
</style>

<template>
  <div id="app">
    <section class="todoapp">
      <todo-input />
      <todo-container />
    </section>

    <the-footer />
  </div>
</template>

<script>
import TheFooter from '@/components/layout/TheFooter.vue';
import TodoContainer from '@/components/todo/TodoContainer.vue';
import TodoInput from '@/components/todo/TodoInput.vue';

export default {
  name: 'App',
  components: { TheFooter, TodoContainer, TodoInput },
}
</script>

<style>
  
</style>

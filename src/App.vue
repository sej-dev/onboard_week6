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
import TheFooter from '~/src/components/layout/TheFooter.vue';
import TodoContainer from '~/src/components/todo/TodoContainer.vue';
import TodoInput from '~/src/components/todo/TodoInput.vue';

export default {
  name: 'App',
  components: { TheFooter, TodoContainer, TodoInput },
}
</script>

<style>
  
</style>

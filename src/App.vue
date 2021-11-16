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
import TheFooter from '@/components/TheFooter.vue';
import TodoContainer from '@/components/TodoContainer.vue';
import TodoInput from '@/components/TodoInput.vue';

export default {
  name: 'App',
  components: { TheFooter, TodoContainer, TodoInput },
}
</script>

<style>
  
</style>

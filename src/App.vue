<template>
  <div id="app">
    <section class="todoapp">
      <the-header></the-header>
      <todo-list></todo-list>
    </section>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
import TodoList from '@/components/TodoList.vue';

export default {
  name: 'App',
  components: { TheHeader, TodoList, TheFooter },
}
</script>

<style>
  
</style>

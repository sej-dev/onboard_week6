<template>
  <section class="main">
    <toggle-all-button />
        
    <todo-list />

    <todo-footer />
  </section>
</template>

<script>
import TodoList from '@/components/todo/TodoList.vue';
import TodoFooter from '@/components/todo/TodoFooter.vue';
import ToggleAllButton from './ToggleAllButton.vue';

export default {
    name: 'TodoContainer',
    components: { TodoList, TodoFooter, ToggleAllButton },
}
</script>

<style>

</style>

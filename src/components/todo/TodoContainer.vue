<template>
  <section class="main">
    <input 
      id="toggle-all" 
      class="toggle-all" 
      type="checkbox"
      :checked="isAllTodoActive"
      @click="toggleAllTodosStatus"
    >
            
    <label for="toggle-all">Mark all as complete</label>
        
    <todo-list />

    <todo-footer />
  </section>
</template>

<script>
import TodoList from '@/components/todo/TodoList.vue';
import TodoFooter from '@/components/todo/TodoFooter.vue';

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('todo')

export default {
    name: 'TodoContainer',
    components: { TodoList, TodoFooter },
    computed: {
        ...mapState({
            totalTodoCount: state => state.todos.length,
        }),
        ...mapGetters(['completedTodoCount']),
        isAllTodoActive(){
            return this.totalTodoCount === this.completedTodoCount;
        }
    },
    methods: {
        ...mapMutations(['toggleAllTodosStatus'])
    }
}
</script>

<style>

</style>

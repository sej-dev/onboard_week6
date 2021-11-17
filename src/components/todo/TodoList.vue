<template>
  <ul
    v-show="hasTodos"
    class="todo-list"
  >
    <todo-item 
      v-for="todo in todosFiltered"
      :key="todo.id"
      v-bind="todo" 
    />
  </ul>
</template>

<script>
import TodoItem from '@/components/todo/TodoItem.vue';

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('todo')

import LIST_FILTER from "@/constants/todo/listFilter";

export default {
    name: 'TodoList',
    components: { TodoItem },
    computed: {
        ...mapState({
            hasTodos: state => state.todos.length > 0,
            curFilter: state => state.listFilter,
        }),
        ...mapGetters(['getActiveTodos', 'getCompletedTodos']),

        todosFiltered(){
            switch (this.curFilter) {
                case LIST_FILTER.ALL: return this.$store.state.todo.todos;
                case LIST_FILTER.ACTIVE: return this.$store.getters['todo/getActiveTodos']();
                case LIST_FILTER.COMPLETED: return this.$store.getters['todo/getCompletedTodos']();
                default: return [];
            }
        }
    },
}
</script>

<style>

</style>
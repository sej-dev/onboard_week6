<template>
  <ul
    v-show="hasTodos"
    class="todo-list"
  >
    <li
      v-for="todo in todosFiltered"
      :key="todo.id" 
      :class="{ completed: todo.status, editing: editedTodoId === todo.id}"
    >
      <todo-item 
        v-bind="todo" 
        @start-edit="setEditedTodoId"
        @end-edit="setEditedTodoId(null)"
      />
    </li>
  </ul>
</template>

<script>
import TodoItem from './TodoItem.vue';

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('todo')

import LIST_FILTER from "@/constants/todo/listFilter";

export default {
    name: 'TodoList',
    components: { TodoItem },
    data: function(){
        return {
            editedTodoId: null,
        }
    },
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
    methods: {
        setEditedTodoId(id){
            this.editedTodoId = id;
        },
    }
}
</script>

<style>

</style>
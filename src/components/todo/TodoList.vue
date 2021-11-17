<template>
  <ul
    v-show="hasTodos"
    class="todo-list"
  >
    <li
      v-for="todo in todosFiltered"
      :key="todo.id" 
      :class="{ completed: todo.status, editing: todoEdited.id === todo.id}"
    >
      <div class="view">
        <input 
          v-model="todo.status" 
          class="toggle" 
          type="checkbox"
        >
        <label @dblclick="editTodo(todo.id)">{{ todo.content }}</label>
        <button
          class="destroy"
          @click="deleteTodo(todo.id)"
        />
      </div>
      <base-input
        v-if="todoEdited.id === todo.id" 
        v-model="todoEdited.content"
        class="edit"
        v-on="$listeners"
        @blur="updateTodo"
        @keyup.enter="updateTodo"
      />
    </li>
  </ul>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue';

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('todo')

import LIST_FILTER from "@/constants/todo/listFilter";

const INIT_TODO_DATA = {
    content: '',
    id: null,
    status: null,
 };

export default {
    name: 'TodoList',
    components: { BaseInput },
    data: function(){
        return {
            todoEdited: INIT_TODO_DATA
        }
    },
    computed: {
        ...mapState({
            hasTodos: state => state.todos.length > 0,
            curFilter: state => state.listFilter,
        }),
        ...mapGetters(['getTodoById', 'getActiveTodos', 'getCompletedTodos']),

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
        ...mapMutations(['deleteTodoById', 'updateTodoById']),

        editTodo(id){
            this.todoEdited = this.getTodoById(id);
        },
        updateTodo(){
            if(this.todoEdited.id == null) return;
            
            this.updateTodoById(this.todoEdited);
            this.todoEdited = INIT_TODO_DATA;
        },
    }
}
</script>

<style>

</style>
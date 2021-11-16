<template>
  <footer class="footer" v-show="hasTodos">
    <span class="todo-count"> {{ activeTodoCount }} items left </span>
    <ul class="filters">
      <li>
        <a href="#/" 
            :class="{ selected : listFilter === 'ALL' }" 
            @click.prevent="changeListFilter('ALL')">All</a>
      </li>
      <li>
        <a href="#/active" 
            :class="{ selected : listFilter === 'ACTIVE' }" 
            @click.prevent="changeListFilter('ACTIVE')">Active</a>
      </li>
      <li>
        <a href="#/completed" 
            :class="{ selected : listFilter === 'COMPLETED' }" 
            @click.prevent="changeListFilter('COMPLETED')">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" 
        v-show="hasCompletedTodo" 
        @click="deleteAllCompletedTodos">
      Clear completed
    </button>
  </footer>
</template>

<script>
import LIST_FILTER from "@/constants/todo/listFilter";

export default {
    name: 'TodoFooter',
    computed: {
        listFilter(){
            return this.$store.state.todo.listFilter;
        },
        hasTodos(){
            return this.$store.state.todo.todos.length > 0;
        },
        hasCompletedTodo(){
            return this.$store.getters['todo/completedTodoCount'] > 0;
        },
        activeTodoCount(){
            return this.$store.getters['todo/activeTodoCount'];
        }
    },
    methods: {
        deleteAllCompletedTodos(){
            this.$store.commit({
                type: 'todo/deleteAllCompletedTodos',
            })
        },
        changeListFilter(listFilter){
            this.$store.commit({
                type: 'todo/changeListFilter',
                listFilter
            })
        }
    }
};
</script>

<style>
</style>
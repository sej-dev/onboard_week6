<template>
  <footer
    v-show="hasTodos"
    class="footer"
  >
    <span class="todo-count"> {{ activeTodoCount }} items left </span>

    <ul class="filters">
      <li
        v-for="filter in filters"
        :key="filter"
      >
        <a
          href="#" 
          :class="{ selected : filter === curFilter }" 
          @click.prevent="changeListFilter(filter)"
        >
          {{ filter | mapFirstCharUpper }}
        </a>
      </li>
    </ul>
    
    <button 
      v-show="hasCompletedTodo" 
      class="clear-completed" 
      @click="deleteAllCompletedTodos"
    >
      Clear completed
    </button>
  </footer>
</template>

<script>
import LIST_FILTER from "@/constants/todo/listFilter";

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('todo')

export default {
    name: 'TodoFooter',
    data: function(){
        return {
            filters: [LIST_FILTER.ALL, LIST_FILTER.ACTIVE, LIST_FILTER.COMPLETED],
        }
    },
    computed: {
        ...mapState({
            curFilter: state => state.listFilter,
            hasTodos: state => state.todos.length > 0,
        }),
        ...mapGetters(['completedTodoCount', 'activeTodoCount']),

        hasCompletedTodo(){
            return this.completedTodoCount > 0;
        }
    },
    methods: {
        ...mapMutations(['deleteAllCompletedTodos', 'changeListFilter']),
        
        
    }
};
</script>

<style>
</style>
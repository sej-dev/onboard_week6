<template>
  <div v-show="hasTodos">
    <input 
      id="toggle-all" 
      class="toggle-all" 
      type="checkbox"
      :checked="isAllTodoActive"
      @change="toggleAllTodosStatus"
    >        
    <label for="toggle-all">Mark all as complete</label>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('todo')

import LIST_FILTER from "@/constants/todo/listFilter";

export default {
    name: 'ToggleAllButton',
    computed: {
        ...mapGetters(['hasTodos', 'getTodosCountByFilter']),
        
        isAllTodoActive(){
            return this.getTodosCountByFilter(LIST_FILTER.ALL) === this.getTodosCountByFilter(LIST_FILTER.ACTIVE);
        }
    },
    methods: {
        ...mapMutations(['toggleAllTodosStatus'])
    }
}
</script>

<style>

</style>
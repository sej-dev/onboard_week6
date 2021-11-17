<template>
  <div>
    <input 
      id="toggle-all" 
      class="toggle-all" 
      type="checkbox"
      :checked="isAllTodoActive"
      @click="toggleAllTodosStatus"
    >        
    <label for="toggle-all">Mark all as complete</label>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('todo')

export default {
    name: 'ToggleAllButton',
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
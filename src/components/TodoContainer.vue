<template>
    <section class="main">
        <input id="toggle-all" 
            class="toggle-all" 
            type="checkbox"
            :checked="isAllTodosActive"
            @click="toggleAllTodoStatus">
        <label for="toggle-all">Mark all as complete</label>
        
        <todo-list />

        <todo-footer />
    </section>
</template>

<script>
import TodoList from '@/components/TodoList.vue';
import TodoFooter from '@/components/TodoFooter.vue';

export default {
    name: 'TodoContainer',
    components: { TodoList, TodoFooter },
    computed: {
        isAllTodosActive(){
            const totalCount = this.$store.state.todo.todos.length;
            console.log(this.$store.getters['todo/completedTodoCount'],totalCount)
            return this.$store.getters['todo/completedTodoCount'] === totalCount;
        }
    },
    methods: {
        toggleAllTodoStatus(){
            this.$store.commit({
                type: 'todo/toggleAllTodosStatus'
            })
        }
    }
}
</script>

<style>

</style>

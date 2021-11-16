<template>
    <section class="main">

        <input id="toggle-all" class="toggle-all" type="checkbox">
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
}
</script>

<style>

</style>

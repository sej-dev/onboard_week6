<template>
    <ul class="todo-list" v-show="hasTodos">
        <li v-for="todo in todoFiltered"
            :key="todo.id" 
            :class="{ completed: todo.status, editing: todoEdited.id === todo.id}">
            <div class="view">
                <input 
                    class="toggle" 
                    type="checkbox" 
                    v-model="todo.status">
                <label @dblclick="setEditMode(todo.id)">{{ todo.content }}</label>
                <button class="destroy" @click="deleteTodo(todo.id)"></button>
            </div>
            <base-input class="edit" 
                v-if="todoEdited.id === todo.id"
                v-model="todoEdited.content"
                v-on="$listeners"
                @blur="updateTodoById"
                @keyup.enter="updateTodoById" />
        </li>
    </ul>
</template>

<script>
import LIST_FILTER from "@/constants/todo/listFilter";
import BaseInput from './BaseInput.vue';

export default {
    components: { BaseInput },
    name: 'TodoList',
    data: function(){
        return {
            todoEdited: {
                content: '',
                id: null
            }
        }
    },
    computed: {
        contentEdited: {
            get(){
                return this.$store.state.todo.content;
            },
            set(content){
                this.$store.commit({
                    type: 'todo/updateTodo',
                    content
                });
            }
        },
        todoFiltered(){
            const listFilter = this.$store.state.todo.listFilter;
            switch (listFilter) {
                case LIST_FILTER.ALL: return this.$store.state.todo.todos;
                case LIST_FILTER.ACTIVE: return this.$store.getters['todo/activeTodos']();
                case LIST_FILTER.COMPLETED: return this.$store.getters['todo/completedTodos']();
                default: return [];
            }
        },
        hasTodos(){
            return this.$store.state.todo.todos.length > 0;
        },
    },
    methods: {
        deleteTodo(id){
            this.$store.commit({
                type: 'todo/deleteTodoById',
                id
            });
        },
        setEditMode(id){
            this.todoEdited = this.$store.getters['todo/todoById'](id);
        },
        updateTodoById(){
            this.$store.commit({
                type: 'todo/updateTodoById',
                content: this.todoEdited.content,
                id: this.todoEdited.id
            });
        }
    }
}
</script>

<style>

</style>
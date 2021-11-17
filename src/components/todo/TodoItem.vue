<template>
  <div>
    <div class="view">
      <input 
        :checked="status"
        class="toggle" 
        type="checkbox" 
        @change="toggleStatus"
      >
      <label @dblclick="editContent">{{ todoContent }}</label>
      <button
        class="destroy"
        @click="deletTodo"
      />
    </div>
    <base-input
      v-if="isEditing" 
      v-model="todoContent"
      class="edit"
      v-on="$listeners"
      @blur="updateTodo"
      @keyup.enter="updateTodo"
    />
  </div>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue';

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('todo')

import TODO_STATUS from "@/constants/todo/todoStatus";

export default {
    name: 'TodoItem',
    components: { BaseInput },
    props: {
        id: Number,
        content: String,
        status: {
            validator: function(value){
                return TODO_STATUS[value] !== null;
            }
        }
    },
    data: function(){
        return {
            todoContent: this.content,
            isEditing: false,
        }
    },
    updated(){
      console.log(this.status)
    },
    methods: {
        ...mapMutations(['deleteTodoById', 'updateTodoById']),

        editContent(){
            this.isEditing = true;
            this.$emit('start-edit', this.id);
        },

        toggleStatus(){
          this.todoStatus = !this.todoStatus;

          this.updateTodoById({
              id: this.id,
              content: this.todoContent,
              status: !this.status
          });
        },

        updateTodo(){
            this.updateTodoById({
                id: this.id,
                content: this.todoContent,
                status: this.todoStatus
            });
            this.isEditing = false;
            this.$emit('end-edit', this.id);
        },

        deletTodo(){
            this.deleteTodoById(this.id);
        }
    }
}
</script>

<style>

</style>
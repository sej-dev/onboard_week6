<template>
  <div>
    <div class="view">
      <input 
        v-model="status" 
        class="toggle" 
        type="checkbox"
      >
      <label @dblclick="editContent">{{ content }}</label>
      <button
        class="destroy"
        @click="deletTodo"
      />
    </div>
    <base-input
      v-if="isEditing" 
      v-model="content"
      class="edit"
      v-on="$listeners"
      @blur="updateContent"
      @keyup.enter="updateContent"
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
            isEditing: false,
        }
    },
    methods: {
        ...mapMutations(['deleteTodoById', 'updateTodoById']),

        editContent(){
            this.isEditing = true;
            this.$emit('start-edit', this.id);
        },

        updateContent(){
            this.updateTodoById({
                id: this.id,
                content: this.content
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
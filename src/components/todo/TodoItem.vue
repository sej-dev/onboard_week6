<template>
  <li :class="{ completed: status, editing: isEditing }">
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
      v-show="isEditing"
      v-model="todoContent"
      class="edit"
      v-on="$listeners"
      @blur="updateTodo"
      @keyup.enter="updateTodo($event)"
    />
  </li>
</template>

<script>
import BaseInput from "@/components/base/BaseInput.vue";

import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("todo");

import TODO_STATUS from "@/constants/todo/todoStatus";

export default {
  name: "TodoItem",
  components: { BaseInput },
  props: {
    id: Number,
    content: String,
    status: {
      validator: function (value) {
        return TODO_STATUS[value] !== null;
      },
    },
  },
  data: function () {
    return {
      todoContent: this.content,
      isEditing: false,
    };
  },
  methods: {
    ...mapMutations(["deleteTodoById", "updateTodoById"]),

    editContent() {
      this.isEditing = true;
    },

    toggleStatus() {
      this.todoStatus = !this.todoStatus;

      this.updateTodoById({
        id: this.id,
        content: this.todoContent,
        status: !this.status,
      });
    },

    updateTodo() {
      
      if(this.isEditing === false) return;
 
      if(this.todoContent === ''){
        this.deletTodo();
      } 
      else {
        this.updateTodoById({
          id: this.id,
          content: this.todoContent,
          status: this.status,
        });
      }

      this.isEditing = false;
    },

    deletTodo() {
      this.deleteTodoById(this.id);
    },
  },
};
</script>

<style></style>

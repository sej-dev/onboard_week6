import TODO_STATUS from "@/constants/todo/todoStatus";
import LIST_FILTER from "@/constants/todo/listFilter";
import { 
    UPDATE_TODO, UPDATE_TODO_BY_ID,
    ADD_TODO, 
    TOGGLE_TODO_BY_ID, TOGGLE_ALL_TODOS_STATUS,
    DELETE_TODO_BY_ID, DELETE_ALL_COMPLETED_TODOS,
    CHANGE_LIST_FILTER
} from "@/store/modules/todo/mutation-types";

const activePredicate = todo => todo.status === TODO_STATUS.ACTIVE;
const completedPredicate = todo => todo.status === TODO_STATUS.COMPLETED;

const state = () => ({
    content: '',
    listFilter: LIST_FILTER.ALL,
    todos: [
        {id:0, content:'a', status:TODO_STATUS.COMPLETED},
        {id:1, content:'b', status:TODO_STATUS.ACTIVE},
    ],
    _idx: 2
});

// 속성 유형 접근   - 캐싱 O
// 메서드 유형 접근 - 캐싱 X
const getters = {
    todoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id);
    },
    activeTodos: (state) => () => {
        return state.todos.filter(activePredicate);
    },
    activeTodoCount: (state, getters) => {
        return getters.activeTodos().length;
    },
    completedTodos: (state) => () => {
        return state.todos.filter(completedPredicate);
    },
    completedTodoCount: (state, getters) => {
        return getters.completedTodos().length;
    }
};

// 비동기 처리 
const actions = {

};

// 동기 처리
const mutations = {
    [UPDATE_TODO](state, payload){
        state.content = payload.content;
    },
    [UPDATE_TODO_BY_ID](state, payload){
        const {id, content} = payload;
        const targetTodo = state.todos.find(todo => todo.id === id);
        targetTodo.content = content;
    },

    [ADD_TODO](state, payload){
        const content = payload.content;
        state.todos.push({ id : state._idx++, status: TODO_STATUS.ACTIVE, content })
    },
    // TODO:  TodoList.vue에서 토글해도 자동으로 변경
    [TOGGLE_TODO_BY_ID](state, payload){
        const id = payload.id;
        const targetTodo = state.todos.find(todo => todo.id === id);
        // TODO: 이렇게 작성해도 변경 사항이 반영되는지 확인
        targetTodo.status = targetTodo.status === TODO_STATUS.ACTIVE ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE;
    },
    [TOGGLE_ALL_TODOS_STATUS](state){
        const totalCount = state.todos.length;
        const completedTodos = state.todos.filter(completedPredicate);
        if(totalCount === completedTodos.length){
            completedTodos.map(todo => todo.status = TODO_STATUS.ACTIVE);
            return;
        } 
        state.todos.map(todo => todo.status = TODO_STATUS.COMPLETED);
    },

    [DELETE_TODO_BY_ID](state, payload){
        const id = payload.id;
        state.todos = state.todos.filter(todo => todo.id !== id);
    },
    [DELETE_ALL_COMPLETED_TODOS](state){
        state.todos = state.todos.filter(todo => todo.status === TODO_STATUS.ACTIVE)
    },

    [CHANGE_LIST_FILTER](state, payload){
        state.listFilter = payload.listFilter;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
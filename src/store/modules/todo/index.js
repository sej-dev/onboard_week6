import TODO_STATUS from "@/constants/todo/todoStatus";
import LIST_FILTER from "@/constants/todo/listFilter";
import { 
    ADD_TODO, DELETE_TODO, TOGGLE_TODO,
    DELETE_ALL_COMPLETED_TODOS
} from "@/store/modules/todo/mutation-types";

const activePredicate = todo => todo.status === TODO_STATUS.ACTIVE;
const completedPredicate = todo => todo.status === TODO_STATUS.COMPLETED;

const state = () => ({
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
    [ADD_TODO](state, payload){
        const content = payload.content;
        state.todos.push({ id : state._idx++, status: TODO_STATUS.ACTIVE, content })
    },
    [DELETE_TODO](state, payload){
        const id = payload.id;
        state.todos = state.todos.filter(todo => todo.id !== id);
    },
    [TOGGLE_TODO](state, payload){
        const id = payload.id;
        const targetTodo = state.todos.find(todo => todo.id === id);
        // TODO: 이렇게 작성해도 변경 사항이 반영되는지 확인
        targetTodo.status = targetTodo.status === TODO_STATUS.ACTIVE ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE;
    },
    [DELETE_ALL_COMPLETED_TODOS](state){
        state.todos = state.todos.filter(todo => todo.status !== TODO_STATUS.ACTIVE)
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
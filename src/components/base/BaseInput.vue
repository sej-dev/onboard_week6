<template>
  <input 
    :value="value"
    v-on="listeners"
    ref="baseInput"
    />
</template>

<script>

export default {
    name: 'BaseInput',
    props: ['value'],
    mounted() {
        this.$refs.baseInput.focus();
    },
    computed: {
        listeners: function(){
            const vm = this;
            return Object.assign({}, this.$listeners, {
                input: function(evt){
                    vm.$emit('input', evt.target.value);
                }
            })
        },
    },
}
</script>

<style>

</style>
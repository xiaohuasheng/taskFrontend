<template>
  <grid
    :draggable="true"
    :sortable="true"
    :items="items"
    :height="100"
    :width="100">
    <template slot="cell" slot-scope="props">
      <div>{{props.item}}</div>
    </template>
  </grid>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      items: [
        'a',
        'b',
        'c'
      ]
    }
  }
}
</script>

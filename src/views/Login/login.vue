<template>
  <div class="index">
    <div id='index_pc_bj'>
      <FormConetnt :form="form"></FormConetnt>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FormConetnt from './components/FormContent.vue'

@Component({
  components: {
    FormConetnt
  }
})
export default class Login extends Vue {
  form:object = {
    name: 'zs',
    psw: '123456'
  }
}
</script>

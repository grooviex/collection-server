<script>
import Window from "~/components/common/Window.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { Window }
})

</script>

<template>
  <Window class="header--title">
    <span>Dashboard</span>
  </Window>
</template>

<style>
.header--title {
  margin: 13px 0 0 0;
  width: calc(100% - 10px);
  padding: 5px;
}
</style>
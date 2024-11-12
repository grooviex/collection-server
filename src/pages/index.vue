<script>
import Window from "~/components/common/Window.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { Window }
})
</script>

<template>
  <div class="previews">
    <div class="preview--top">
      <Window class="statistics">
        <a href="/pages/statistics">Statistics</a>
      </Window>
    </div>

    <div class="previews--bottom">
      <Window class="songs">
        <a href="/pages/songs">Songs</a>
      </Window>

      <Window class="connections">
        <a href="/pages/connections">Connections</a>
      </Window>
    </div>
  </div>
</template>

<style>
.previews {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  margin: 10px 0 0 0;

  .previews--top,
  .previews--bottom {
    display: flex;
    position: relative;

    flex: 1;
    height: 40%;
    width: calc(100% - 20px);
  }
}
</style>
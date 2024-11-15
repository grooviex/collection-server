<script>
import Window from "~/components/common/Window.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { Window }
})
</script>

<template>
  <div class="previews">
    <div class="previews--top">
      <Window class="statistics previews--item">
        <NuxtLink to="/statistics">Statistics</NuxtLink>
        <div class="previews--item-content">
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>
      </Window>
    </div>

    <div class="previews--bottom">
      <Window class="songs previews--item">
        <NuxtLink to="/songs">Songs</NuxtLink>
        <div class="previews--item-content">
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>
      </Window>

      <Window class="connections previews--item">
        <NuxtLink to="/connections">Connections</NuxtLink>
        <div class="previews--item-content">
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </div>
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

    .previews--item {
      background-color: rgba(var(--color-surface), 0.5);

      min-height: 30vh;
      width: calc(100% - 20px);

      flex-direction: column;

      padding: 5px 0 0 6px;

      .previews--item-content {
        display: flex;
        padding: 5px 0 0 0;
      }
    };

    .songs {
      width: 150vw;
    }

    .previews--bottom {
      min-height: 50vh;
    }
  }
}
</style>

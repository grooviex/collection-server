<script lang="ts">
const items = ref([{ message: "songs one"}, {message: "songs two"}]);
</script>

<template>
  <commonPage>
    <commonWindow class="songs-overview">
      <div class="songs-overview--header">
        <h2>Songs Overview</h2>
        <p>Cool Songs you added will be listed here</p>
      </div>

      <div class="songs-overview--content">
        <li v-for="item in items">
         {{item}}
        </li>
      </div>
    </commonWindow>
  </commonPage>
</template>

<style>
.songs-overview {
  display: flex;
  height: 50vh;
  width: 100%;
  padding: 5px;
}
</style>

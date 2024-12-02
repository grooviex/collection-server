<script setup lang="ts">
const songs = await useFetch('/api/v2/collection/tracks');
</script>

<template>
  <commonPage>
    <commonWindow class="songs-overview">
      <div class="songs-overview--header">
        <h2>Songs Overview</h2>
        <p>Cool Songs you added will be listed here</p>
      </div>

      <div class="songs-overview--content">

        <li v-for="song in songs">
          {{ song }}
        </li>

      </div>
    </commonWindow>
  </commonPage>
</template>

<style>
.songs-overview {
  display: flex;
  flex-direction: column;

  height: 50vh;
  width: 100%;

  padding: 5px;
}

.songs-overview--content {
  padding: 10px 0 0 0;
}
</style>

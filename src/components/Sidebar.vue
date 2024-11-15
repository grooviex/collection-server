<script setup lang="ts">
import Window from "~/components/common/Window.vue";

const route = useRoute();
let classes = ref(['sidebar--nav-item']);

onBeforeRouteUpdate((newRoute) => {


})

</script>

<template>
  <Window class="sidebar">
    <div class="sidebar--nav" v-for="linkClass in classes">

      <NuxtLink to="/" :class="linkClass">
        <span class="material-symbols-rounded">map</span>
        <span class="sidebar--nav-item-text">Dashboard</span>
      </NuxtLink>

      <NuxtLink to="/statistics" :class="linkClass">
        <span class="material-symbols-rounded">monitoring</span>
        <span  class="sidebar--nav-item-text">Statistics</span>
      </NuxtLink>

      <NuxtLink to="/songs" :class="linkClass">
        <span class="material-symbols-rounded">database</span>
        <span class="sidebar--nav-item-text">Songs</span>
      </NuxtLink>

      <NuxtLink to="/connections" :class="linkClass">
        <span class="material-symbols-rounded">sync_alt</span>
        <span class="sidebar--nav-item-text">Connections</span>
      </NuxtLink>
    </div>

    <div class="sidebar--nav">
      <NuxtLink to="/user/settings" class="sidebar--nav-item">
        <span class="material-symbols-rounded">manage_accounts</span>
        <span class="sidebar--nav-item-text">Manage Account</span>
      </NuxtLink>
      <NuxtLink to="/user/logout" class="sidebar--nav-item">
        <span class="material-symbols-rounded">logout</span>
        <span class="sidebar--nav-item-text">Logout</span>
      </NuxtLink>
    </div>
  </Window>
</template>

<style>
.sidebar {
  position: fixed;
  flex-direction: column;
  justify-content: space-between;

  gap: 15px;
  width: 200px;
  height: calc(100% - 20px);

  border: 1px solid rgba(var(--color-rose), 0.7);

  .sidebar--nav {
    display: flex;
    flex-direction: column;

    gap: 10px;
    padding: 8px;

    .sidebar--nav-item {
      display: flex;
      text-decoration: none;
      align-items: center;

      padding: 0 0 0 5px;

      border-radius: 5px;

      transition: background-color 0.5s;

      .sidebar--nav-item-text {
        padding: 0 0 0 5px;
      }

      &.active,
      &:hover {
        background-color: rgb(var(--color-highlight-med));
      }
    }
  }
}
</style>

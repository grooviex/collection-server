<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <CommonWindow class="sidebar">
    <div class="sidebar--nav">

      <NuxtLink to="/dashboard" class="sidebar--nav-item" :class="{ active: route.path.startsWith('/dashboard')}">
        <span class="material-symbols-rounded">map</span>
        <span class="sidebar--nav-item-text">Dashboard</span>
      </NuxtLink>

      <NuxtLink to="/statistics" class="sidebar--nav-item" :class="{ active: route.path.startsWith('/statistics')}">
        <span class="material-symbols-rounded">monitoring</span>
        <span  class="sidebar--nav-item-text">Statistics</span>
      </NuxtLink>

      <NuxtLink to="/songs" class="sidebar--nav-item" :class="{ active: route.path == '/songs'}">
        <span class="material-symbols-rounded">database</span>
        <span class="sidebar--nav-item-text">Songs</span>
      </NuxtLink>

      <NuxtLink to="/connections" class="sidebar--nav-item" :class="{ active: route.path.startsWith('/connections')}">
        <span class="material-symbols-rounded">sync_alt</span>
        <span class="sidebar--nav-item-text">Connections</span>
      </NuxtLink>
    </div>

    <div class="sidebar--nav">
      <NuxtLink to="/user/settings" class="sidebar--nav-item" :class="{ active: route.path.startsWith('/user/settings')}">
        <span class="material-symbols-rounded">manage_accounts</span>
        <span class="sidebar--nav-item-text">Manage Account</span>
      </NuxtLink>
      <NuxtLink to="/user/logout" class="sidebar--nav-item" :class="{ active: route.path.startsWith('/user/layout')}">
        <span class="material-symbols-rounded">logout</span>
        <span class="sidebar--nav-item-text">Logout</span>
      </NuxtLink>
    </div>
  </CommonWindow>
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

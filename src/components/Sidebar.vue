<script setup lang="ts">
import Window from "~/components/common/Window.vue";
</script>

<template>
  <Window class="header--sidebar">
    <div class="sidebar--nav">
      <a href="/public" class="sidebar--nav-item active">
        <span class="material-symbols-rounded">map</span><span style="padding: 5px">Dashboard</span>
      </a>

      <a class="sidebar--nav-item">
        <span class="material-symbols-rounded">database</span><span style="padding: 5px">Songs</span>
      </a>

      <a href="/users" class="sidebar--nav-item">
        <span class="material-symbols-rounded">sync_alt</span><span style="padding: 5px">Connections</span>
      </a>
    </div>

    <div class="sidebar--nav">
      <a href="/user/settings" class="sidebar--nav-item">
        <span class="material-symbols-rounded">manage_accounts</span><span style="padding: 5px">Manage Account</span>
      </a>
      <a href="/user/logout" class="sidebar--nav-item">
        <span class="material-symbols-rounded">logout</span><span style="padding: 5px">Logout</span>
      </a>
    </div>
  </Window>
</template>

<style>
header {
  .header--sidebar {
    position: fixed;
    flex-direction: column;
    justify-content: space-between;

    gap: 15px;
    width: 200px;
    height: calc(100% - 20px);

    .sidebar--nav {
      display: flex;
      flex-direction: column;
      gap: 10px;

      padding: 8px;

      .sidebar--nav-item {
        transition: background-color 0.5s;

        display: flex;
        text-decoration: none;
        flex-direction: row;
        align-items: center;
        padding: 0 0 0 5px;

        &.active,
        &:hover {
          background-color: rgb(var(--color-highlight-med));
          border-radius: 5px;
          transition: padding 0.5s;
        }

        &.active svg {
          padding: 2px 2px 0;
        }

        &:hover svg {
            padding: 2px;
        }
      }

    }
  }
}
</style>

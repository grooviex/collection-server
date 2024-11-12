<script setup lang="ts">
</script>

<template>
  <header>
    <div class="sidebar">
      <div class="sidebar--nav">
        <a href="/public" class="sidebar--nav-item active">
          <span class="material-symbols-outlined">
            explore
          </span>
          Dashboard
        </a>

        <a class="sidebar--nav-item">
            Databases
        </a>

        <a href="/users" class="sidebar--nav-item">
            Users
        </a>
      </div>
      </div>
  </header>
</template>
rgb(144, 140, 170)
<style>
header {
  .sidebar {
    position: fixed;
    display: flex;
    flex-direction: column;

    gap: 15px;
    width: 155px;
    height: calc(100% - 20px);
    margin: 10px 0 0 10px;

    border: 1px solid rgba(var(--color-rose));
    border-radius: 4px;
    box-shadow: 10px 13px 20px 5px rgba(0,0,0,0.37);

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

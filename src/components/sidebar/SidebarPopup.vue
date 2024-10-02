<script>

</script>

<template>
<div class="sidebar-popup">
  <div class="sidebar-popup--content">
    <p>content</p>
  </div>
</div>
</template>

<style>
.sidebar-popup {
  display: flex;
  position: fixed;

  height: 15vh;
  width: 230px;
  margin-left: 55px;

  border: 2px solid rgb(var(--color-rose));
  border-radius: 6px;

  background-color: rgb(var(--color-surface));

  .sidebar-popup--content {
    padding: 10px;
  }

  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s, opacity 0.2s linear, margin-left 0.5s;
}
</style>
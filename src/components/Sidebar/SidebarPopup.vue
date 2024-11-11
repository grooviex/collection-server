<script>

</script>

<template>
  <div class="sidebar-popup">
    <div class="sidebar-popup--content">
      <slot />
    </div>
</div>
</template>

<style>
.sidebar-popup {
  display: flex;
  position: fixed;

  height: auto;
  width: 230px;
  margin-left: 55px;

  border: 2px solid rgb(var(--color-rose));
  border-left-color: rgb(var(--color-base));
  border-radius: 0 6px 6px 0;


  .sidebar-popup--content {
    padding: 10px;

    & a {
      display: flex;
      text-decoration: none;
      padding: 2px 0;
    };
  }

  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s, opacity 0.1s linear;
}
</style>

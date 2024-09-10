<script setup lang="ts">

</script>

<template>
  <header>
    <div class="top-bar">
      <div class="top-bar--img-container">
        <img id="logo" src="/images/headphones.png" alt="logo-png"/>
      </div>

      <div class="top-bar--content">

      </div>
    </div>

    <div class="sidebar">
      <a href="/dashboard" class="sidebar--item">
        <i/>
        <p>D</p>
      </a>
      <a href="/database" class="sidebar--item">
        <i/>
        <p>DA</p>
      </a>
      <a href="/users" class="sidebar--item">
        <i/>
        <p>U</p>
      </a>
    </div>
  </header>
</template>

<style>
header {

  .top-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 60px;

    background-color: rgb(var(--color-bar));

    img#logo {
      width: 32px;
    }

    .top-bar--img-container {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 80px;


    }

    .top-bar--content {

      width: 100%;
      height: 100%;

      border-bottom: 2px solid rgba(159, 105, 146, .3);
    }

  }

  .sidebar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    position: fixed;
    overflow: auto;

    width: 80px;
    height: 100%;
    margin: 0;
    padding: 0;



    background-color: rgb(var(--color-bar));
    border-right: 2px solid rgba(159, 105, 146, .3);

    .sidebar--item {
      text-decoration: none;
    }

    .sidebar--item:hover p {
      color: red;
    }
  }
}
</style>
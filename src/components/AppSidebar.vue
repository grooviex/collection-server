<script setup lang="ts">
import { ref } from 'vue'
let el = ref(null);

let onClickSidebarCollapse = ($event) => {
    let iconRight = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>';
    let iconLeft = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>'

    let el = $event.target.parentNode;
    let sidebar = el.closest('.sidebar');


    // TODO: change button icons
    if (!sidebar.classList.contains('extended')) {
        el.innerHTML = iconLeft;

        sidebar.classList.add('extended');
        sidebar.style.width = "230px";
    } else {
        el.innerHTML = iconRight;

        sidebar.classList.remove('extended');
        sidebar.style.width = "80px";
    }

}

</script>

<template>
  <header>
    <div class="sidebar">

      <div class="sidebar--img-container">
        <img id="logo" src="/images/trumpet.png" alt="logo-png"/>
      </div>

      <div class="sidebar--nav">
        <a href="/" class="sidebar--nav-item active">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h240v-560H200v560Zm320 0h240v-280H520v280Zm0-360h240v-200H520v200Z"/></svg>
        </a>

        <a href="/database" class="sidebar--nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M503.77-360Q544-360 572-387.84q28-27.84 28-68.16v-192h120v-96H552v205q-11-6-22.5-9.5T504-552q-40.32 0-68.16 27.77-27.84 27.78-27.84 68Q408-416 435.77-388q27.78 28 68 28ZM312-240q-29.7 0-50.85-21.15Q240-282.3 240-312v-480q0-29.7 21.15-50.85Q282.3-864 312-864h480q29.7 0 50.85 21.15Q864-821.7 864-792v480q0 29.7-21.15 50.85Q821.7-240 792-240H312Zm0-72h480v-480H312v480ZM168-96q-29.7 0-50.85-21.15Q96-138.3 96-168v-552h72v552h552v72H168Zm144-696v480-480Z"/></svg>
        </a>

        <a href="/users" class="sidebar--nav-item ">
          <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M168-96q-29.7 0-50.85-21.15Q96-138.3 96-168v-432q0-29.7 21.15-50.85Q138.3-672 168-672h216v-120q0-29.7 21.15-50.85Q426.3-864 456-864h48q29.7 0 50.85 21.15Q576-821.7 576-792v120h216q29.7 0 50.85 21.15Q864-629.7 864-600v432q0 29.7-21.15 50.85Q821.7-96 792-96H168Zm0-72h624v-432H576q0 30-21.15 51T504-528h-48q-29.7 0-50.85-21.15Q384-570.3 384-600H168v432Zm72-72h240v-23q0-17.63-9.5-32.67Q461-310.7 444-319q-20-8-40.5-12.5T360-336q-23 0-43.5 4.5T276-318.53q-17 7.53-26.5 22.66Q240-280.74 240-263v23Zm336-48h144v-72H576v72Zm-216-72q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm216-48h144v-72H576v72ZM456-600h48v-192h-48v192Zm24 216Z"/></svg>
        </a>
      </div>

      <div class="sidebar--nav bottom">
        <a class="sidebar--nav-item" @click="onClickSidebarCollapse($event)">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
        </a>
      </div>

    </div>
  </header>
</template>

<style>
header {
  .sidebar {
    transition: width 0.7s;
    position: fixed;

    display: flex;
    align-items: center;
    flex-direction: column;

    gap: 15px;
    height: 100%;
    width: 80px;


    background-color: rgb(var(--color-surface));
    border-right: 2px solid rgba(var(--color-rose));

    .sidebar--img-container {
      display: flex;

      padding-top: 10px;

      img#logo {
        width: 40px;

      }
    }

    .sidebar--nav {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;

      &.bottom {
          justify-content: flex-end;
          margin-top: auto;
      }

      .sidebar--nav-item {
        text-decoration: none;

        & svg {
          transition: padding 0.5s;

        }

        &.active svg {
          padding: 2px 2px 0;
          
        }

        &.active,
        &:hover svg {
          padding: 2px;
          background-color: rgb(var(--color-highlight-med));
          border-radius: 10px;
          transition: padding 0.5s;

        }
      }

    }
  }
}
</style>
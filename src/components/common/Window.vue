<script setup lang="ts">
</script>

<template>
  <div class="grooviex--window"><slot/></div>
</template>

<style>

.grooviex--window {
  background-color: rgba(var(--color-surface), 0.5);

  display: flex;

  margin: 10px;

  border-radius: 10px;
  box-shadow: 10px 13px 20px 5px rgba(0,0,0,0.37);
}

</style>

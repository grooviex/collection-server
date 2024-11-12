<script setup lang="ts">
</script>

<template>
  <div class="grooviex--window"><slot/></div>
</template>

<style>

.grooviex--window {
  display: flex;


  margin: 10px;

  border: 1px solid rgba(var(--color-rose), 0.7);
  border-radius: 4px;
  box-shadow: 10px 13px 20px 5px rgba(0,0,0,0.37);
}

</style>

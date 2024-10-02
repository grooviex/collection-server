<template>
  <div>
    <NuxtLayout>
      <Sidebar/>
      <NuxtPage/>
      <Footer/>
    </NuxtLayout>
  </div>
</template>

<style>
@import url("~/assets/css/variables/colors.css");

* {
  position: relative;
  padding: 0;
  margin: 0;

  color: rgb(var(--color-text));
  box-sizing: border-box;
}

body  {
  background-color: rgb(var(--color-base));
}

</style>
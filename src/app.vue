<template>
  <div>
    <NuxtLayout>
      <AppSidebar/>
      <NuxtPage/>
      <AppFooter/>
    </NuxtLayout>
  </div>
</template>

<style>
@import url("~/assets/css/variables/colors.css");

* {
  padding: 0;
  margin: 0;
  color: white;
  box-sizing: border-box;
}

body  {
  background-color: rgb(var(--color-base));
}

</style>
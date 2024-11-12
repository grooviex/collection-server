<template>
  <div>
    <NuxtLayout>
      <header>
        <Sidebar/>
      </header>
      <div class="content">
        <NuxtPage/>
      </div>
      <footer>
        <Footer/>
      </footer>
    </NuxtLayout>
  </div>
</template>

<style>
/* Imports of Fonts; Variables; etc. */
@import url("~/assets/css/variables/colors.css");
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
@font-face {
  font-family: "Material Symbols Rounded";
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialsymbolsrounded/v194/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rIelXxc.woff2)
  format("woff2");
}

/* Add icon classes */
.material-symbols-rounded {
  font-family: 'Material Symbols Rounded', monospace;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
}

/* Default settings for every element */
* {
  font-family: "JetBrains Mono", monospace;
  font-optical-sizing: auto;
  font-style: normal;

  position: relative;
  padding: 0;
  margin: 0;

  color: rgb(var(--color-text));
  box-sizing: border-box;
}

/* Change background color */
body  {
  background-color: rgb(var(--color-base));
}


/* Content/Sidebar changes */
.content {
  display: flex;
  margin: 0 0 0 220px;
}
</style>
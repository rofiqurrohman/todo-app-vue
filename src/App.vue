<template>
  <div class="home">
    <nav class="bg-primary">
      <div class="container py-4">
        <h4 class="text-white" data-cy="header-title">TODO LIST APP</h4>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.home {
  background: #f4f4f4;
  min-height: 100vh;
}
</style>

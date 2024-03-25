<script setup>
import { API_HOST } from "../utils.js"
</script>

<template>
  <a :href="`${API_HOST}/google`" class="btn btn-accent mr-1">
    Login
  </a>
</template>

<script setup>
import GatheringPoint from "../components/GatheringPoint.vue"
</script>

<template>
  <template v-if="userInfo === null">
    <h1 class="text-4xl font-bold mb-8">
      You aren't logged in
    </h1>
    <LoginButton />
  </template>

  <template v-else-if="false">
    <h1 class="text-4xl font-bold mb-8">
      You are not allowed to view this page
    </h1>
  </template>

  <template v-else>
    <div class="flex">
      <RouterLink class="mx-2" v-for="exit of ['1', '2', '3', '4', '5', '6', 'A']"
        :to="exit === 'A' ? '/gathering-points' : { name: 'gathering-points', params: { exit } }">
        <GatheringPoint :gatheringPoint="exit" />
      </RouterLink>
    </div>
  </template>
</template>

<script>
</script>

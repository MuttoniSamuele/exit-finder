<script setup>
import { IS_RSPP, fetchUserInfo } from "../utils.js"
import { buildings } from "../App.vue"
import GatheringPoint from "../components/GatheringPoint.vue"
</script>

<template>
  <div class="flex h-full">
    <div class="hero">
      <div class="hero-content text-center">
        <div>
          <div class="flex justify-center mb-6">
            <img class="w-72" src="../../static/paleo.png" alt="Paleocapa logo">
          </div>
          <h1 class="text-5xl font-bold text-secondary">
            Exit Finder
          </h1>
          <p class="py-6 text-xl italic">
            Quickly find the closest gathering point to your classroom.
          </p>
        </div>
      </div>
    </div>

    <div class="divider divider-horizontal"></div>

    <div class="flex flex-col justify-center w-3/5">
      <div class="hero mb-8">
        <div class="hero-content flex flex-col">
          <h2 class="text-3xl font-bold text-primary">
            Find
          </h2>
          <div class="bg-primary h-[0.1rem] w-full opacity-50"></div>
          <RouterLink class="btn btn-ghost btn-wide btn-sm" v-for="[building, name] of buildings"
            :to="{ name: 'classrooms', params: { building } }">
            {{ name }}
          </RouterLink>
        </div>
      </div>

      <div v-if="IS_RSPP" class="hero mb-14">
        <div class="hero-content flex flex-col">
          <h2 class="text-3xl font-bold text-accent">
            Gathering points
          </h2>
          <div class="bg-accent h-[0.1rem] w-full opacity-50"></div>
          <div class="flex justify-around w-full">
            <RouterLink v-for="gatheringPoint of ['1', '2', '3', '4', '5', '6']"
              :to="{ name: 'classrooms', params: { building: gatheringPoint } }">
              <GatheringPoint :gatheringPoint="gatheringPoint" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: []
    }
  },
  async mounted() {
    this.userInfo = await fetchUserInfo();
  }
}
</script>

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

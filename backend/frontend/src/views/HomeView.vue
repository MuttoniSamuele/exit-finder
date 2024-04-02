<script setup>
import { fetchUserInfo, fetchClassroom, fetchClass } from "../utils.js"
import { CLASSROOMS } from "../classrooms.js"
import GatheringPoint from "../components/GatheringPoint.vue"
import { openModal } from "../components/MapModal.vue"
</script>

<template>
  <div :class="'flex flex-col lg:flex-row h-full ' + (userInfo === null ? 'justify-center' : '')">
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

    <div v-if="userInfo !== null" class="divider divider-horizontal hidden lg:flex"></div>
    <div v-if="userInfo !== null" class="divider lg:hidden"></div>

    <div v-if="userInfo !== null"
      class="mt-12 pb-16 lg:pb-0 lg:my-0 lg:w-2/3 flex flex-row lg:flex-col justify-center items-center">
      <div class="card w-72 h-auto bg-base-300 shadow-xl">
        <div class="card-body">
          <h2 class="card-title flex justify-between">
            {{ `${userInfo.given_name || ""} ${userInfo.family_name || ""}` }}
            <GatheringPoint v-if="gatheringPoint !== null" :gatheringPoint="gatheringPoint" />
          </h2>
          <p class="italic text-left">
          </p>
          <div class="divider -mt-3 mb-1"></div>
          <div class="flex justify-between text-lg">
            <span class="font-bold text-base">Classroom</span>
            <span v-if="classroom === 'LOADING'" class="loading loading-spinner loading-sm"></span>
            <span v-else-if="classroom === null" class="italic">No data</span>
            <span v-else>{{ classroom }}</span>
          </div>
          <div class="flex justify-between text-lg">
            <span class="font-bold text-base">Class</span>
            <span v-if="studClass === 'LOADING'" class="loading loading-spinner loading-sm"></span>
            <span v-else-if="studClass === null" class="italic">No data</span>
            <span v-else>{{ studClass }}</span>
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
      userInfo: null,
      classroom: null,
      studClass: null,
      gatheringPoint: null
    }
  },
  async mounted() {
    this.userInfo = await fetchUserInfo();
    if (this.userInfo === null) {
      return;
    }
    this.classroom = this.studClass = "LOADING";
    this.classroom = await fetchClassroom(this.userInfo.email);
    for (const c of CLASSROOMS) {
      if (c.Name === this.classroom) {
        this.gatheringPoint = c.GatheringPoint;
        break;
      }
    }
    this.studClass = await fetchClass(this.classroom);
  }
}
</script>

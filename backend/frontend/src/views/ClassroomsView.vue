<script setup>
import ClassroomsList from "../components/ClassroomsList.vue"
import { buildings, floors } from "../App.vue"
import { fetchUserInfo, compareClassroomsFactory, filterClassroomsByFloor, filterClassroomsByBuilding } from "../utils.js"
import { CLASSROOMS } from "../classrooms.js"
import LoginButton from "../components/LoginButton.vue"
</script>

<template>
  <template v-if="userInfo === null">
    <h1 class="text-4xl font-bold mb-8">
      You aren't logged in
    </h1>
    <LoginButton />
  </template>

  <template v-else-if="!userInfo.isPaleocapa">
    <h1 class="text-4xl font-bold mb-8">
      You are not allowed to view this page
    </h1>
    <a href="/" class="btn btn-accent mr-1">
      Back to home
    </a>
  </template>

  <template v-else>
    <h1 class="text-4xl text-primary font-bold">
      {{ (buildings.filter(([b, _n]) => b === building)[0] || ["", "Why are you here?"])[1] }}
    </h1>
    <template v-for="[floor, floorName] of floors">
      <section class="my-12"
        v-if="classrooms.length > 0 && filterClassroomsByFloor(filterClassroomsByBuilding(classrooms, building), floor).length > 0">
        <h2 class="text-3xl font-bold mb-2">
          {{ floorName }}
        </h2>
        <ClassroomsList
          :classrooms="filterClassroomsByFloor(filterClassroomsByBuilding(classrooms, building), floor).sort(compareClassroomsFactory())"
          :showData="false" />
      </section>
    </template>
  </template>
</template>

<script>
export default {
  data() {
    return {
      building: "",
      classrooms: [],
      userInfo: null
    }
  },
  async mounted() {
    this.building = this.$route.params.building;
    this.userInfo = await fetchUserInfo();
    this.classrooms = CLASSROOMS;
  },
  watch: {
    async $route(_to, _from) {
      this.building = this.$route.params.building;
      this.userInfo = await fetchUserInfo();
    }
  }
}
</script>

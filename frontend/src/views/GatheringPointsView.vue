<script setup>
import GatheringPoint from "../components/GatheringPoint.vue"
import ClassroomsList from "../components/ClassroomsList.vue"
import { fetchUserInfo, fetchClassrooms, compareClassroomsFactory, filterClassroomsByGatheringPoint } from "../utils.js"
import LoginButton from "../components/LoginButton.vue"
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
      <RouterLink class="mx-2" v-for="gp of ['A', '1', '2', '3', '4', '5', '6']"
        :to="gp === 'A' ? '/gathering-points' : { name: 'gathering-points', params: { gatheringPoint: gp } }">
        <GatheringPoint :gatheringPoint="gp" />
      </RouterLink>
    </div>

    <div class="my-8">
      <ClassroomsList
        :classrooms="(gatheringPoint.length > 0 ? filterClassroomsByGatheringPoint(classrooms, gatheringPoint) : classrooms).sort(compareClassroomsFactory(true))" />
    </div>
  </template>
</template>

<script>
export default {
  data() {
    return {
      gatheringPoint: "",
      classrooms: [],
      userInfo: null
    }
  },
  async mounted() {
    this.gatheringPoint = this.$route.params.gatheringPoint;
    this.userInfo = await fetchUserInfo();
    this.classrooms = await fetchClassrooms();
  },
  watch: {
    async $route(_to, _from) {
      this.gatheringPoint = this.$route.params.gatheringPoint;
      this.userInfo = await fetchUserInfo();
    }
  }
}
</script>

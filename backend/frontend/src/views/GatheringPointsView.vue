<script setup>
import GatheringPoint from "../components/GatheringPoint.vue"
import ClassroomsList from "../components/ClassroomsList.vue"
import { fetchUserInfo, compareClassroomsFactory, filterClassroomsByGatheringPoint, fetchClass, fetchNumOfStudents } from "../utils.js"
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

  <template v-else-if="!userInfo.isPaleocapa || userInfo.type !== 'rspp'">
    <h1 class="text-4xl font-bold mb-8">
      You are not allowed to view this page
    </h1>
    <a href="/" class="btn btn-accent mr-1">
      Back to home
    </a>
  </template>

  <template v-else>
    <div class="flex">
      <div :class="'mx-2 ' + (gatheringPoint === gp || (gp === 'A' && gatheringPoint === '') ? 'opacity-50' : '')"
        v-for="gp of ['A', '1', '2', '3', '4', '5', '6']">
        <RouterLink
          :to="gp === 'A' ? '/gathering-points' : { name: 'gathering-points', params: { gatheringPoint: gp } }">
          <GatheringPoint :gatheringPoint="gp" />
        </RouterLink>
      </div>
    </div>

    <div class="mt-8 mb-4 text-lg">
      <span class="font-bold text-base">Total students: </span>
      <span v-if="numOfStudents === 'LOADING'" class="loading loading-spinner loading-sm ml-1"></span>
      <span v-else-if="numOfStudents === null" class="italic">No data</span>
      <span v-else>{{ numOfStudents }}</span>
    </div>

    <div class="mb-8">
      <ClassroomsList :classrooms="classrooms" />
    </div>
  </template>
</template>

<script>
export default {
  data() {
    return {
      gatheringPoint: "",
      classrooms: [],
      userInfo: null,
      numOfStudents: null
    }
  },
  methods: {
    async init() {
      this.gatheringPoint = this.$route.params.gatheringPoint;
      this.userInfo = await fetchUserInfo();
      this.numOfStudents = "LOADING";
      this.classrooms = (this.gatheringPoint.length > 0
        ? filterClassroomsByGatheringPoint(CLASSROOMS, this.gatheringPoint)
        : CLASSROOMS).sort(compareClassroomsFactory(true));
      let students = 0;
      await Promise.all(this.classrooms.map((c) => (async () => {
        c.class = await fetchClass(c.Name);
        c.students = c.class === null ? null : await fetchNumOfStudents(c.class);
        if (c.students !== null) {
          students += c.students;
        }
      })()));
      this.numOfStudents = students > 0 ? students : null;
    }
  },
  async mounted() {
    await this.init();
  },
  watch: {
    async $route(_to, _from) {
      await this.init();
    }
  }
}
</script>

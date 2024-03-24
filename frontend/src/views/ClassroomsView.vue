<script setup>
import ClassroomCard from "../components/ClassroomCard.vue"
import { buildings, floors } from "../App.vue"
import { fetchUserInfo } from "../utils.js"
import LoginButton from "../components/LoginButton.vue"
</script>

<template>
  <template v-if="userInfo === null">
    <h1 class="text-4xl font-bold mb-8">
      You aren't logged in
    </h1>
    <LoginButton />
  </template>

  <template v-else>
    <h1 class="text-4xl text-primary font-bold">
      {{ (buildings.filter(([b, _n]) => b === building)[0] || ["", "Why are you here?"])[1] }}
    </h1>
    <template v-for="[floor, floorName] of floors">
      <section class="my-12" v-if="classrooms.length > 0 && filterClassrooms(floor).length > 0">
        <h2 class="text-3xl font-bold mb-2">
          {{ floorName }}
        </h2>
        <div class="flex flex-wrap">
          <ClassroomCard v-for="c of filterClassrooms(floor).sort(compareClassrooms)" :name="c.Name"
            :longName="c.Longname" :gatheringPoint="c.GatheringPoint" />
        </div>
      </section>
    </template>
  </template>
</template>

<script>
// TODO: Login for paleocapa only
// TODO: Ask for login when in /classrooms/whatever
export default {
  data() {
    return {
      building: "",
      classrooms: [],
      userInfo: null
    }
  },
  methods: {
    async fetchClassrooms() {
      const res = await fetch("http://localhost:3000/classrooms");
      return res.ok ? await res.json() : [];
    },
    filterClassrooms(floor) {
      return this.classrooms.filter(
        (c) => c.Building === this.building && c.Floor === floor
      );
    },
    compareClassrooms(a, b) {
      function calcWeight(name) {
        const digits = [];
        for (const c of name) {
          const n = parseInt(c);
          if (!isNaN(n)) {
            digits.push(n);
          }
        }
        if (digits.length === 3) {
          return digits[0] * 100 + digits[1] * 10 + digits[2];
        }
        if (digits.length == 2) {
          return digits[0] * 100 + digits[1];
        }
        return 999;
      }
      return calcWeight(a.Name) - calcWeight(b.Name)
    }
  },
  async mounted() {
    this.building = this.$route.params.building;
    this.userInfo = await fetchUserInfo();
    this.classrooms = await this.fetchClassrooms();
  },
  watch: {
    async $route(_to, _from) {
      this.building = this.$route.params.building;
      this.userInfo = await fetchUserInfo();
    }
  }
}
</script>

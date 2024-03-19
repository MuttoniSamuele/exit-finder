<script setup>
  import ClassroomCard from "../components/ClassroomCard.vue"
</script>

<template>
  {{ building }}
  <ClassroomCard
    name="T3-8"
    longName="T3-8 Lab. Tecn. CAD Tessile"
    gatheringPoint="6"
  />
</template>

<script>
export default {
  data() {
    return {
      building: "",
      classrooms: []
    }
  },
  methods: {
    async fetchClassrooms() {
      const res = await fetch("http://localhost:3000/classrooms");
      return res.ok ? await res.json() : [];
    }
  },
  mounted() {
    this.classrooms = this.fetchClassrooms();
  },
  watch: {
    async $route(_to, _from){
      this.building = this.$route.params.building;
    }
  }
}
</script>

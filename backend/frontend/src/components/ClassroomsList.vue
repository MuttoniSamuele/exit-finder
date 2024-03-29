<script setup>
import ClassroomCard from "../components/ClassroomCard.vue"
</script>

<template>
  <div class="flex flex-wrap justify-around xs:justify-normal">
    <ClassroomCard v-for="c of classrooms" :name="c.Name" :longName="c.Longname" :gatheringPoint="c.GatheringPoint"
      :showData="showData" />
  </div>
</template>

<script>
export default {
  props: ["classrooms", "showData"]
}
</script>

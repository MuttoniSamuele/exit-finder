<script setup>
import GatheringPoint from "../components/GatheringPoint.vue"
</script>

<template>
  <div class="card w-52 bg-base-300 shadow-xl mr-6 my-3">
    <div class="card-body">
      <h2 class="card-title">
        <GatheringPoint :gatheringPoint="gatheringPoint" />
        {{ name }}
      </h2>
      <p class="italic">
        {{ longName }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "longName", "gatheringPoint"]
}
</script>

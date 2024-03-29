<script setup>
import GatheringPoint from "../components/GatheringPoint.vue"
import { openModal } from "../components/MapModal.vue"
</script>

<template>
  <button class="card w-52 bg-base-300 shadow-xl mr-6 my-3" @click="() => openModal(name, gatheringPoint, showData)">
    <div class="card-body">
      <h2 class="card-title">
        <GatheringPoint :gatheringPoint="gatheringPoint" />
        {{ name }}
      </h2>
      <p class="italic text-left">
        {{ longName }}
      </p>
    </div>
  </button>
</template>

<script>
export default {
  props: ["name", "longName", "gatheringPoint", "showData"],
}
</script>

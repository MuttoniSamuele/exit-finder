<template>
  <div class="card w-52 bg-base-300 shadow-xl mr-6 my-3">
    <div class="card-body">
      <h2 class="card-title">
        <div :class="'flex justify-center items-center w-7 h-7 rounded-full text-neutral-content '
          + (gatheringPoint === '1'
            ? 'bg-red-500'
            : gatheringPoint === '2'
              ? 'bg-pink-500'
              : gatheringPoint === '3'
                ? 'bg-yellow-500'
                : gatheringPoint === '4'
                  ? 'bg-green-500'
                  : gatheringPoint === '5'
                    ? 'bg-blue-500'
                    : gatheringPoint === '6'
                      ? 'bg-purple-500'
                      : 'bg-black')">
          {{ gatheringPoint }}
        </div>
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

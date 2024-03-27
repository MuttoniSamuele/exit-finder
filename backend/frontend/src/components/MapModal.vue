<script setup>
import { CLASSROOM_PINS, GATHERING_PINS } from "../pins.js";
</script>

<template>
  <dialog id="map-modal" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
      </form>
      <h3 id="map-modal-title" class="font-bold text-2xl mb-4"></h3>
      <div class="relative">
        <img id="classroom-pin" class="absolute w-[4%] -translate-x-1/2 -translate-y-full"
          src="../../static/blue-pin.png">
        <img id="gathering-pin" class="absolute w-[4%] -translate-x-1/2 -translate-y-full"
          src="../../static/red-pin.png">
        <img id="map-image" class="rounded-lg" src="../../static/map.jpg">
      </div>
    </div>
  </dialog>
</template>

<script>
export async function openModal(name, gatheringPoint) {
  const modal = document.getElementById("map-modal");
  const modalTitle = document.getElementById("map-modal-title");
  const mapImage = document.getElementById("map-image");
  const cPinImage = document.getElementById("classroom-pin");
  const gPinImage = document.getElementById("gathering-pin");
  if (!modal || !modalTitle || !mapImage || !cPinImage || !gPinImage) {
    return;
  }
  modal.open = true;
  modalTitle.innerText = `Route from classroom ${name} to gathering point ${gatheringPoint}`;
  const cPinPoint = CLASSROOM_PINS[name];
  const gPinPoint = GATHERING_PINS[gatheringPoint];
  cPinImage.style.left = `${cPinPoint.x * 100}%`;
  cPinImage.style.top = `${cPinPoint.y * 100}%`;
  gPinImage.style.left = `${gPinPoint.x * 100}%`;
  gPinImage.style.top = `${gPinPoint.y * 100}%`;
}
</script>

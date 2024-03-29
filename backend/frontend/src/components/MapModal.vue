<script setup>
import { CLASSROOM_PINS, GATHERING_PINS } from "../pins.js";
import { fetchClass, fetchNumOfStudents } from "../utils.js"
</script>

<template>
  <dialog id="map-modal" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
      </form>
      <h3 id="map-modal-title" class="font-bold text-2xl mb-4"></h3>
      <div id="modal-stud-data" class="my-4 text-lg flex">
        <div>
          <span class="font-bold text-base">Class: </span>
          <span id="class-spinner" class="loading loading-spinner loading-sm ml-1"></span>
          <span id="class-no-data" class="italic">No data</span>
          <span id="class-value"></span>
        </div>
        <div class="ml-6">
          <span class="font-bold text-base">Total students: </span>
          <span id="tot-studs-spinner" class="loading loading-spinner loading-sm ml-1"></span>
          <span id="tot-studs-no-data" class="italic">No data</span>
          <span id="tot-studs-value"></span>
        </div>
      </div>
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
export async function openModal(name, gatheringPoint, showData = false) {
  const modal = document.getElementById("map-modal");
  const modalTitle = document.getElementById("map-modal-title");
  const mapImage = document.getElementById("map-image");
  const cPinImage = document.getElementById("classroom-pin");
  const gPinImage = document.getElementById("gathering-pin");
  const studData = document.getElementById("modal-stud-data");
  const studsSpinner = document.getElementById("tot-studs-spinner");
  const studsNoData = document.getElementById("tot-studs-no-data");
  const studsValue = document.getElementById("tot-studs-value");
  const classSpinner = document.getElementById("class-spinner");
  const classNoData = document.getElementById("class-no-data");
  const classValue = document.getElementById("class-value");
  if (!modal || !modalTitle || !mapImage || !cPinImage || !gPinImage || !studData ||
    !studsSpinner || !studsNoData || !studsValue || !classSpinner || !classNoData || !classValue) {
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
  if (showData) {
    studData.classList.remove("hidden");
  } else {
    studData.classList.add("hidden");
    return;
  }
  studsSpinner.classList.remove("hidden");
  classSpinner.classList.remove("hidden");
  studsValue.classList.add("hidden");
  studsNoData.classList.add("hidden");
  classValue.classList.add("hidden");
  classNoData.classList.add("hidden");
  const studClass = await fetchClass(name);
  classSpinner.classList.add("hidden");
  if (studClass !== null) {
    classNoData.classList.add("hidden");
    classValue.classList.remove("hidden");
    classValue.innerText = `${studClass}`;
  } else {
    classNoData.classList.remove("hidden");
    classValue.classList.add("hidden");
  }
  const students = studClass === null ? null : await fetchNumOfStudents(studClass);
  studsSpinner.classList.add("hidden");
  if (students !== null) {
    studsNoData.classList.add("hidden");
    studsValue.classList.remove("hidden");
    studsValue.innerText = `${students}`;
  } else {
    studsNoData.classList.remove("hidden");
    studsValue.classList.add("hidden");
  }
}
</script>

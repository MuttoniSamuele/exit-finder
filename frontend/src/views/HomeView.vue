<script setup>
import { buildings } from "../App.vue"
</script>

<template>
  <div class="flex h-full">
    <div class="hero">
      <div class="hero-content text-center">
        <div>
          <div class="flex justify-center mb-6">
            <img class="w-72" src="../../static/paleo.png" alt="Paleocapa logo">
          </div>
          <h1 class="text-5xl font-bold text-accent">
            Exit Finder
          </h1>
          <p class="py-6 text-xl italic">
            Quickly find the closest gathering point to your classroom.
          </p>
        </div>
      </div>
    </div>

    <div class="divider divider-horizontal"></div>

    <div class="hero w-3/5">
      <div class="hero-content flex flex-col">
        <h2 class="text-3xl font-bold text-primary">
          Find
        </h2>
        <div class="bg-primary h-[0.1rem] w-full opacity-50"></div>
        <RouterLink class="btn btn-ghost btn-wide btn-sm" v-for="[building, name] of buildings"
          :to="{ name: 'classrooms', params: { building } }">
          {{ name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

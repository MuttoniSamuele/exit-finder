<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { API_HOST, fetchUserInfo } from "./utils.js"
import LoginButton from "./components/LoginButton.vue"
import MapModal from "./components/MapModal.vue"
</script>

<template>
  <nav class="navbar bg-base-300 fixed top-0 z-10">
    <div class="flex-1">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-64">
          <li>
            <span>Find</span>
            <ul class="p-2">
              <li v-for="[building, name] of buildings">
                <RouterLink :to="{ name: 'classrooms', params: { building } }">
                  {{ name }}
                </RouterLink>
              </li>
            </ul>
          </li>
          <li>
            <RouterLink to="/gathering-points">
              Gathering points
            </RouterLink>
          </li>
        </ul>
      </div>

      <RouterLink class="btn btn-ghost text-xl" to="/">
        Exit Finder
      </RouterLink>

      <div class="dropdown hidden sm:block">
        <div tabindex="0" role="button" class="btn btn-ghost m-1 font-normal">
          Find
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
          <li v-for="[building, name] of buildings">
            <RouterLink :to="{ name: 'classrooms', params: { building } }">
              {{ name }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="hidden sm:inline">
        <RouterLink class="btn btn-ghost m-1 font-normal" to="/gathering-points">
          Gathering points
        </RouterLink>
      </div>
    </div>

    <div class="flex-none gap-2">
      <template v-if="userInfo !== null">
        <span class="hidden sm:block font-bold">
          {{ `${userInfo.given_name || ""} ${userInfo.family_name || ""}` }}
        </span>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Your profile picture" :src="userInfo.picture" />
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-32">
            <li>
              <a :href="`${API_HOST}/logout`" class="text-red-400">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </template>

      <template v-else>
        <LoginButton />
      </template>
    </div>
  </nav>

  <main class="flex-1 flex justify-center h-full pt-[4.5rem]">
    <div class="w-4/5 m-8">
      <RouterView />
    </div>
  </main>

  <MapModal />
</template>

<script>
export default {
  data() {
    return {
      userInfo: null,
    }
  },
  async mounted() {
    this.userInfo = await fetchUserInfo();
  }
}
export const buildings = [
  ["Centrale", "Edificio centrale"],
  ["Informatica", "Palazzina informatica"],
  ["Elettronica", "Palazzina elettronica"],
  ["Meccanica", "Palazzina meccanica"],
  ["Tessile", "Palazzina tessile"],
  ["Palestre", "Palestre"],
];
export const floors = [
  ["Ground", "Ground floor"],
  ["1", "1st floor"],
  ["2", "2nd floor"],
  ["3", "3rd floor"]
];
</script>

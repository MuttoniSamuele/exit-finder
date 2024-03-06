<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar bg-base-300">
    <div class="flex-1">
      <RouterLink class="btn btn-ghost text-xl" to="/">
        Exit Finder
      </RouterLink>

      <ul class="menu menu-horizontal px-1">
        <li>
          <RouterLink to="/about">
            About
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="flex-none gap-2">
      <template v-if="false">
        <span class="font-bold">
          John Doe
        </span>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Your profile picture"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-32">
            <li>
              <a class="text-error">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </template>

      <template v-else>
        <a href="localhost:3000/google" class="btn btn-primary">Login</a>
      </template>
    </div>
  </nav>

  <main class="flex justify-center mt-4">
    <div class="w-4/5">
    <RouterView />
    </div>
  </main>
</template>

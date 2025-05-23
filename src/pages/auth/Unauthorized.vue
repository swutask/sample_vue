<template>
  <div class="min-h-full text-grey-main flex flex-col bg-primary px-15">
    <LogoModule class="pt-40 md:pl-25" />

    <div class="fixed top-0 left-0 p-15 w-full h-full bg-backdrop flex justify-center items-center z-50">
      <div class="relative bg-primary max-w-[380px] w-full rounded-4 pl-20 p-20">
        <div class="text-dark-500">
          <p class="text-22 font-black">
            Sign in
          </p>
          <p class="text-14 mt-15 mb-25">
            Session expired, please log in
          </p>
        </div>
        <div class="flex justify-end items-center">
          <ButtonModule
            text="Log in"
            class="bg-[#17DB6D] hover:bg-[#13c861] rounded-4 px-35 py-12 text-white text-15"
            @click="login"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

function login () {
  const url = route.params.savedUrl || ''
  router.push({ name: 'Login', params: { savedUrl: url } })
}
</script>

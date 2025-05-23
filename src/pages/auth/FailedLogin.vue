<template>
  <div class="min-h-full text-grey-main flex flex-col bg-primary px-15">
    <LogoModule class="pt-40 md:pl-25" />

    <div class="w-full max-w-[380px] mx-auto mt-30 md:m-auto">
      <div class="flex flex-col items-start m-15">
        <div class="text-center w-full">
          <p class="text-24 text-error font-bold">Sorry, something went wrong.</p>
        </div>

        <p class="mb-40">We'we working on getting this fixed as soon as we can</p>

        <ButtonModule
          text="Back to Login"
          class="text-brand text-18 p-5"
          prefix="icon-keyboard-arrow-left text-13"
          @click="$router.push({ name: 'Login' })"
        />
      </div>
    </div>
  </div>
</template>

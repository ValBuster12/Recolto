<template>
  <div class="flex flex-col h-full">
    <header class="bg-[url('/assets/header_recolto.jpg')] bg-cover h-18 md:h-24">
      <div
        class="flex justify-between items-center mx-auto p-2 md:p-4"
      >
        
        <div class="flex items-center gap-2">
          
          <UDropdown
            :items="localeOptions"
            :popper="{ placement: 'bottom-start' }"
            class="z-[2000] hidden md:block"
          >
            <UButton
              icon="i-heroicons-language"
              color="white"
              :label="localeName"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
          <UButton
            title="About"
            icon="i-heroicons-information-circle-20-solid"
            size="xl"
            :ui="{ rounded: 'rounded-full', icon: {base: 'bg-white'}}"
            color="black"
            variant="ghost"
            square
            @click="isAboutModalOpen = true"
          />
        </div>
      </div>
    </header>
    <div class="flex-grow flex">
      <slot />
    </div>
  </div>
  <UModal v-model="isAboutModalOpen" :ui="{wrapper: 'relative z-[1004]'}">
    <div class="p-10">
      <UButton
        size="xl"
        :ui="{ rounded: 'rounded-full' }"
        square
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="absolute right-1 top-1"
        @click="isAboutModalOpen = false"
      />
      <p class="font-bold mb-4">
        Ce site est une démo du logiciel.
      </p>
      <hr class="flex md:hidden my-4">
      <div class="flex md:hidden my-4 gap-2">
        <UButton
          :label="t('layout.give_opinion')"
          to="https://framaforms.org/donnez-votre-avis-sur-1739970454"
          target="_blank"
        />
        <UDropdown
          :items="localeOptions"
          :popper="{ placement: 'bottom-start' }"
          class="z-[2000]"
        >
          <UButton
            icon="i-heroicons-language"
            :label="localeName"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">

const isAboutModalOpen = ref(false);
const { t, locale, locales, setLocale } = useI18n()

const localeName = computed(() => locales.value.find(l => l.code === locale.value)?.name)

const localeOptions = computed(() => {
  return [ locales.value.map(l => ({
    label: l.name,
    click: () => {
      setLocale(l.code)
    }
  })) ]
})
</script>


<template>
  <div class="md:mb-2">
    <SearchBar
      class="mb-6"
      @new-location="$emit('newCenter', $event)"
    />
    <SubStep
      :number="1"
      :title="t('step1.substep1')"
    >
      <div class="flex gap-3 flex-wrap justify-between">
        <UButton
          v-for="option of roofTypeList"
          :key="option.name"
          color="white"
          variant="outline"
          :trailing="false"
          @click="selectRoofType(option.name)"
          class="flex flex-col items-center w-20 md:w-24 h-24 md:h-28 border-2 rounded"
          :class="selectedRoofType === option.name ? 'border-green-500' : 'border-blue-500'"
        >
          <img
            :src="option.image"
            alt=""
            class="w-12 h-12 object-cover mb-1 rounded"
          />
          <span class="text-xs md:text-sm font-semibold">{{ t(option.label) }}</span>
        </UButton>
      </div>
    </SubStep>
    <SubStep
      :number="2"
      :title="t('step1.substep2')"
    >
      <div v-if="!props.roofSurface">
        <UButton
          icon="i-heroicons-paint-brush-20-solid"
          color="white"
          variant="outline"
          :trailing="false"
          @click="$emit('drawRoof', { area: 'roof'})"
          class="h-8 w-32 md:h-12 md:w-48 mx-auto my-2 bg-purple flex justify-center items-center hover:bg-purple-900 focus:ring-2"
        >
          {{ t("step1.draw_roof") }}
        </UButton>
      </div>
      <div v-else class="flex flex-wrap my-2 md:mt-6 md:mb-4 mx-2">
        <p class="w-2/3 text-base md:text-lg font-semibold">{{ t("step1.useful_surface") }}</p>
        <p class="w-1/3 text-lg md:text-xl font-bold flex justify-end self-center">
          {{ (props.roofSurface).toLocaleString(locale) }}&nbsp;m²
        </p>
        <UButton
          v-if="roofSurface"
          icon="i-heroicons-paint-brush-20-solid"
          color="white"
          variant="outline"
          :trailing="false"
          @click="$emit('drawRoof', { area: 'roof' })"
          class="sm:h-12 sm:w-48 mx-auto my-2 flex justify-center items-center"
          :ui="{ variant: { outline: 'shadow-sm bg-transparent text-white-900 dark:text-white ring-1 ring-inset ring-white dark:ring-white-400 focus:ring-2 focus:ring-purple dark:focus:ring-white hover:bg-purple' }}"
        >
          {{ t("calculator.redraw") }}
        </UButton>
      </div>
    </SubStep>
    <SubStep
      :number="3"
      :title="t('step1.substep3')"
    >
      <div class="flex flex-row items-center">
        <UToggle
          name="sewageSystem" id="sewageSystem"
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
          v-model="hasSewageSystem"
          :ui="{
            active: 'bg-purple-900 dark:bg-slate-700',
            inactive: 'bg-gray-700 dark:bg-slate-500'
          }"
        />
        <label for="sewageSystem" class="ml-2 font-semibold text-base">
          {{
            hasSewageSystem ? t("yes") : t("no")
          }}
        </label>
      </div>
    </SubStep>
  </div>
</template>

<script lang="ts">
import { RoofType } from '~/declaration';

export const roofTypeList: (RoofType & { image: string })[] = [
  { label: 'step1.slate', name: 'ardoise', coeff: 0.8, image: '/assets/ardoise.jpg' },
  { label: 'step1.tile', name: 'tuile', coeff: 0.9, image: '/assets/tuiles.jpeg' },
  { label: 'step1.flat', name: 'plat', coeff: 0.6, image: '/assets/toit_plat.jpg' },
  { label: 'step1.planted', name: 'vegetal', coeff: 0.4, image: '/assets/toit_vegetal.jpeg' },
];
</script>

<script setup lang="ts">
import SearchBar from '../map/SearchBar.vue';
import SubStep from './SubStep.vue';

const { t, locale } = useI18n();

const emit = defineEmits([
  "newCenter",
  "select",
  "drawRoof",
]);

const roofType = defineModel<RoofType>('roofType', { required: true })
const selectedRoofType = ref(roofType.value.name)

const hasSewageSystem = defineModel<boolean>('hasSewageSystem', {required: true})
const props = defineProps<{
  roofSurface?: number,
}>();

const selectRoofType = (name: string) => {
  selectedRoofType.value = name
  roofType.value = roofTypeList.find((option) => option.name === name) ?? roofTypeList[0]
}
</script>

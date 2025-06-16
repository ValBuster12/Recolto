<template>
  <SubStep
    :number="4"
    :title="t('step2.substep4')"
  >
    <UsageAccordion :title="t('step2.exterior_uses')">
      <div class="flex flex-col">
        <p class="mb-2 mx-2 justify-center text-base text-center my-2">
          <span class="garden-icon mx-2">⬤</span>
          {{ t('step2.garden_irrigation') }}
        </p>
        <div class="flex flex-row items-center text-base text-center my-2">
          <UButton
        color="white"
        variant="outline"
        :trailing="false"
        @click="$emit('drawWaterUsage', { area: 'garden', action: 'draw' })"
        class="h-10 w-2/6 text-sm sm:text-base mx-auto bg-purple flex justify-center items-center hover:bg-purple-900 focus:ring-2 z-50"
      >
        <template #leading>
          <UIcon
            class="h-5 w-5 hidden sm:block"
            name="i-heroicons-paint-brush-20-solid"
          />
          {{ t("step2.draw") }}
        </template>
      </UButton>
      <p class="w-1/6">{{ t("or") }}</p>
      <div
        class="w-3/6 flex items-center"
      >
        <UInput
          inputClass="h-10 dark:bg-slate-700 bg-white"
          type="number"
          :color="isErrorSurfaceGarden ? 'red' : 'white'"
          :min="0"
          v-model.number="surfaceGarden"
          @blur="removeDraw('garden')"
        />
        <p>&nbsp;m²</p>
      </div>
        </div>
        <p class="mb-2 mx-2 justify-center items-center text-base text-center my-2">
          <span class="vegetable-icon mx-2">⬤</span>
          {{ t('step2.veg_garden_irrigation') }}
        </p>
        <div class="flex flex-row items-center text-base text-center my-2">
          <UButton
        color="white"
        variant="outline"
        :trailing="false"
        @click="$emit('drawWaterUsage', { area: 'vegetable', action: 'draw' })"
        class="h-10 w-2/6 text-sm sm:text-base mx-auto bg-purple flex justify-center items-center hover:bg-purple-900 focus:ring-2 z-50"
      >
        <template #leading>
          <UIcon
            class="h-5 w-5 hidden sm:block"
            name="i-heroicons-paint-brush-20-solid"
          />
          {{ t("step2.draw") }}
        </template>
      </UButton>
      <p class="w-1/6">{{ t("or") }}</p>
      <div
        class="w-3/6 flex items-center"
      >
        <UInput
          inputClass="h-10 dark:bg-slate-700 bg-white"
          type="number"
          :min="0"
          :color="isErrorSurfaceVegetable ? 'red' : 'white'"
          v-model.number="surfaceVegetable"
          @blur="removeDraw('vegetable')"
        />
        <p>&nbsp;m²</p>
      </div>
        </div>
      </div>
    </UsageAccordion>
  </SubStep>
</template>

<script setup lang="ts">

import SubStep from "./SubStep.vue";
import UsageAccordion from "./UsageAccordion.vue";

const { t } = useI18n();

const emit = defineEmits(["drawWaterUsage"]);

const surfaceGarden = defineModel<number>('surfaceGarden', {required: true})
const surfaceVegetable = defineModel<number>('surfaceVegetable', {required: true})
const otherNeeds = defineModel<number>('otherNeeds', {required: true})
const toiletsConnected = defineModel<boolean>('toiletsConnected', {required: true})
const washingMachineConnected = defineModel<boolean>('washingMachineConnected', {required: true})
const residentNumber = defineModel<number>('residentNumber', {required: true})

const props = defineProps<{
  surfaceGardenDrawn: number,
  surfaceVegetableDrawn: number,
  forceResetInput: null | { area: "garden" | "vegetable", newValue: number },
}>();
const isErrorSurfaceGarden = computed(() => {
  return surfaceGarden.value < 0;
})
const isErrorSurfaceVegetable = computed(() => {
  return surfaceVegetable.value < 0;
})
const isErrorResidentNumber = computed(() => {
  return residentNumber.value < 0;
})
const isErrorExteriorMaintenance = computed(() => {
  return otherNeeds.value < 0;
})
const isNotOk = computed(() => {
  return isErrorExteriorMaintenance.value || isErrorResidentNumber.value || isErrorSurfaceVegetable.value || isErrorSurfaceGarden.value;
})
const removeDraw = (area: "garden" | "vegetable") => {
  if (props.surfaceVegetableDrawn > 0 && props.surfaceVegetableDrawn !== surfaceGarden.value) {
    emit("drawWaterUsage", { area: area, action: "clear" });
  }
  if (props.surfaceGardenDrawn > 0 && props.surfaceGardenDrawn !== surfaceVegetable.value) {
    emit("drawWaterUsage", { area: area, action: "clear" });
  }
};

watch(() => props.forceResetInput, () => {
  // N.B. Indeed newValue is never used, but it is necessary to trigger watch :)
  // Force reset when user removed all area via button
  if (props.forceResetInput?.area === "garden") {
    surfaceGarden.value = 0;
  }
  if (props.forceResetInput?.area === "vegetable") {
    surfaceVegetable.value = 0;
  }
});

watch(() => props.surfaceGardenDrawn, () => {
  // Avoid to override input value when user update manually surfaceGarden
  if (props.surfaceGardenDrawn > 0) {
    surfaceGarden.value = props.surfaceGardenDrawn;
  }
});

watch(() => props.surfaceVegetableDrawn, () => {
  // Avoid to override input value when user update manually surfaceVegetable
  if (props.surfaceVegetableDrawn > 0) {
    surfaceVegetable.value = props.surfaceVegetableDrawn;
  }
});
</script>

<style scoped>

.garden-icon {
  color: #6ce868;
}

.vegetable-icon {
  color: #f47e27;
}
</style>

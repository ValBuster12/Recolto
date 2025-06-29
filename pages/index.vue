<template>
  <div class="flex flex-col md:flex-row flex-grow">
    <div class="md:w-[30%] flex">
      <recolto-calculator
        class="w-full"
        :roof-surface="roofSurface"
        :roof-center="roofCenter"
        :surface-garden-drawn="surfaceGardenDrawn"
        :surface-vegetable-drawn="surfaceVegetableDrawn"
        :force-reset-input="forceResetInput"
        @newCenter="($e) => center = $e"
        @draw-roof="allowDrawMap($event)"
        @draw-water-usage="allowDrawMap($event)"
      />
    </div>
    <div class="md:w-[70%] order-2 md:order-none">
      <recolto-map
        class="h-80 md:h-full"
        :draw-enabled="drawEnabled"
        :center="center"
        @polygon:created="onPolygonCreated"
        @polygon:edited="onPolygonEdited"
        @polygon:deleted="onPolygonDeleted"
      />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import L from "leaflet";
import RecoltoMap from "../components/map/RecoltoMap.vue";
import RecoltoCalculator from "../components/calculator/RecoltoCalculator.vue";

definePageMeta({
  layout: "app",
  middleware: ["auth"],
});

/**
 * User input data
 */
const roofCenter = ref<L.LatLng | L.LatLngLiteral>()
const roofSurface = ref(0)

const surfaceGardenDrawn = ref(0);
const surfaceVegetableDrawn = ref(0);

/**
 * Force input to 0 when user remove all area via action deleted
 * (To prevent conflict when user update value manually in input)
 */
const forceResetInput= ref<null | {
  area: "garden" | "vegetable",
  newValue: number
}>(null);

const drawEnabled = ref<{ area: "roof" | "garden" | "vegetable" | "allUsage", action?: "draw" | "clear" }>();

/**
 * Allow to active leaflet draw
 * According to the area, user can draw or clear layer in map
 */
const allowDrawMap = (data: { area: "roof" | "garden" | "vegetable" | "allUsage", action?: "draw" | "clear" }) => {
  if (data.action === "clear" && data.area === "garden") {
    // Reset value when user update manually surfaceGarden
    surfaceGardenDrawn.value = 0;
  }
  if (data.action === "clear" && data.area === "vegetable") {
    // Reset value when user update manually surfaceVegetable
    surfaceVegetableDrawn.value = 0;
  }
  if (data.action === "clear" && data.area === "allUsage") {
    // Reset value when user change step
    surfaceGardenDrawn.value = 0;
    surfaceVegetableDrawn.value = 0;
  }
  drawEnabled.value = data;
};

const center = ref<{ latlng: L.LatLng | L.LatLngLiteral, accuracy?: number }>()

/**
 * Manage data when a polygon is created on the map
 */
function onPolygonCreated (geodesicArea: number, newCentroid: L.LatLng | L.LatLngLiteral, area: string) {
  if (area === "roof") {
    roofCenter.value = newCentroid;
    // Force number of float to prevent behavior from JS engine
    roofSurface.value = Number(geodesicArea.toFixed(2));
  }
  if (area === "garden") {
    // Force number for float to prevent behavior from JS engine
    surfaceGardenDrawn.value = Number((surfaceGardenDrawn.value + geodesicArea).toFixed(2));
  }
  if (area === "vegetable") {
    // Force number for float to prevent behavior from JS engine
    surfaceVegetableDrawn.value = Number((surfaceVegetableDrawn.value + geodesicArea).toFixed(2));
  }
}

/**
 * Manage data when a polygon is edited on the map
 */
function onPolygonEdited (totalGeodesicArea: number, area: string) {
  if (area === "roof") {
    // Force number for float to prevent behavior from JS engine
    roofSurface.value = Number(totalGeodesicArea.toFixed(2));
    // maxStepIndex.value = 2;
  }
  if (area === "garden") {
    // Force number for float to prevent behavior from JS engine
    surfaceGardenDrawn.value = Number(totalGeodesicArea.toFixed(2));
  }
  if (area === "vegetable") {
    // Force number for float to prevent behavior from JS engine
    surfaceVegetableDrawn.value = Number(totalGeodesicArea.toFixed(2));
  }
}

/**
 * Manage data when a polygon is deleted on the map
 */
const onPolygonDeleted = (geodesicArea: number, area: string) => {
  // Reminder: it is impossible to delete a roof layer
  if (area === "garden") {
    // Force number for float to prevent behavior from JS engine
    surfaceGardenDrawn.value = Number((surfaceGardenDrawn.value - geodesicArea).toFixed(2));
    forceResetInput.value = {
      area: "garden",
      newValue: Number((surfaceGardenDrawn.value - geodesicArea).toFixed(2)),
    };
  }
  if (area === "vegetable") {
    // Force number for float to prevent behavior from JS engine
    surfaceVegetableDrawn.value = Number((surfaceVegetableDrawn.value - geodesicArea).toFixed(2));
    forceResetInput.value = {
      area: "vegetable",
      newValue: Number((surfaceVegetableDrawn.value - geodesicArea).toFixed(2)),
    };
  }
};

useHead({
  title: "Calculateur",
});
</script>


<template>
  <form class="flex flex-col gap-4">
    <!-- Address row -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="w-full sm:w-1/4 font-semibold">Address:</label>
      <input type="text" class="flex-1 border rounded p-2" placeholder="Enter address" />
      <button type="button" class="bg-purple text-white px-4 py-2 rounded">Use current location</button>
    </div>

    <!-- Roof type row -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="w-full sm:w-1/4 font-semibold">Roof Type:</label>
      <button type="button" class="flex-1 sm:w-auto bg-gray-200 px-3 py-2 rounded">Tile</button>
      <button type="button" class="flex-1 sm:w-auto bg-gray-200 px-3 py-2 rounded">Slate</button>
      <button type="button" class="flex-1 sm:w-auto bg-gray-200 px-3 py-2 rounded">Flat</button>
      <button type="button" class="flex-1 sm:w-auto bg-gray-200 px-3 py-2 rounded">Green</button>
    </div>

    <!-- Roof boundary row -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="w-full sm:w-1/4 font-semibold">Roof Boundary:</label>
      <button type="button" class="bg-purple text-white px-4 py-2 rounded">Draw on map</button>
      <input type="number" class="flex-1 border rounded p-2" placeholder="Surface" />
      <button type="button" class="bg-purple text-white px-4 py-2 rounded">Redraw</button>
    </div>

    <!-- Garden boundary row -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="w-full sm:w-1/4 font-semibold">Garden Boundary:</label>
      <button type="button" class="bg-purple text-white px-4 py-2 rounded">Draw on map</button>
      <input type="number" class="flex-1 border rounded p-2" placeholder="Surface" />
      <button type="button" class="bg-purple text-white px-4 py-2 rounded">Redraw</button>
    </div>

    <!-- Potager boundary row -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="w-full sm:w-1/4 font-semibold">Potager Boundary:</label>
      <button type="button" class="bg-purple text-white px-4 py-2 rounded">Draw on map</button>
      <input type="number" class="flex-1 border rounded p-2" placeholder="Surface" />
      <button type="button" class="bg-purple text-white px-4 py-2 rounded">Redraw</button>
    </div>

    <!-- Gutters linked to sewer -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="w-full sm:w-1/4 font-semibold">Gutters linked to sewer?</label>
      <input type="checkbox" class="mr-2" />
      <button type="button" class="bg-purple text-white px-4 py-2 rounded">Calculate</button>
    </div>

    <!-- Results row -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="w-full sm:w-1/4 font-semibold">Results:</label>
      <div class="flex-1">Water needed</div>
      <div class="flex-1">Optimum storage</div>
      <div class="flex-1">Estimated savings</div>
    </div>

    <!-- Analysis row -->
    <div class="flex flex-col gap-1">
      <label class="font-semibold">Analysis of your needs, based on yearly rain levels</label>
    </div>

    <!-- Info row -->
    <div class="flex flex-wrap items-center gap-2">
      <label class="w-full sm:w-1/4 font-semibold">Info:</label>
      <div class="flex-1">Last year known</div>
      <div class="flex-1">Driest year</div>
      <div class="flex-1">Wettest year</div>
    </div>

    <!-- Graph row -->
    <div class="flex flex-col">
      <label class="font-semibold">Estimation chart</label>
      <div class="h-40 bg-gray-200 flex items-center justify-center">Graph here</div>
    </div>
  </form>
</template>

<script setup>
// This component only provides a sample layout for the form using flexbox.
</script>

<style scoped>
/***** Colors from Tailwind theme *****/
.bg-purple { @apply bg-purple-700; }
</style>


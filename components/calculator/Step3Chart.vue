<template>
  <div id="refChart" />
</template>
<script setup lang="ts">
import Plotly from "plotly.js-dist-min";
import { PrecipitationScenario, WaterNeedsByMonth, WaterByMonth } from '~/declaration';
const { t } = useI18n();

const props = defineProps<{
  roofPotentialWaterCollect?: WaterByMonth,
  waterNeeds?: WaterNeedsByMonth,
  waterCollectorLevel?: WaterByMonth,
  scenario: PrecipitationScenario
}>();

const drawGraph = () => {
  const data: Partial<Plotly.PlotData>[] = []
  const x = [
    t('months.jan'),
    t('months.feb'),
    t('months.mar'),
    t('months.apr'),
    t('months.may'),
    t('months.jun'),
    t('months.jul'),
    t('months.aug'),
    t('months.sep'),
    t('months.oct'),
    t('months.nov'),
    t('months.dec')
  ]

  if (props.roofPotentialWaterCollect) {
    data.push({
      x,
      y: props.roofPotentialWaterCollect,
      hovertemplate: "%{y:.0f} L<extra></extra>",
      type: "bar",
      name: t('step3.graph_rain_potential'),
      marker: {
        color: props.scenario === "nearest" ? "#29235c" : props.scenario === "driest" ? "#af6708" : "#085421",
        opacity: 0.8,
      },
    })
  }
  if (props.waterNeeds) {
    data.push({
      x,
      y: props.waterNeeds,
      hovertemplate: "%{y:.0f} L<extra></extra>",
      type: "bar",
      name: t('step3.graph_water_needs'),
      marker: { color: "#009fe3" },
    })
  }
  if (props.waterCollectorLevel) {
    data.push({
      x,
      y: props.waterCollectorLevel,
      hovertemplate: "%{y:.0f} L<extra></extra>",
      type: "scatter",
      name: t('step3.graph_storage_evolution'),
      marker: { color: "#9b093e", size: 6, opacity: 0.8 },
      line: { dash: "dot", shape: "spline", width: 2.5 },
    })
  }

  const maxY = Math.max(...data.map(item => Math.max(...(item.y as number[]))))

  const layout: Partial<Plotly.Layout> = {
    font: { size: 12 },
    xaxis: {
      tickangle: -40,
      tickfont: { size: 12 },
    },
    yaxis: {
      range: [0, maxY * 1.1],
      tickfont: { size: 12 },
      tickformat: ",d",
      autorange: true,
      ticksuffix: " L",
    },
    barmode: "group",
    bargap: 0.2,
    separators: "  .",
    bargroupgap: 0.15,
    showlegend: true,
    legend: { orientation: "h", x: 0, y: -0.2 },
    height: 400,
    margin: { l: 80, r: 80, b: 50, t: 40, pad: 2 },
  };

  const refChart = document.getElementById("refChart");
  Plotly.react(refChart!, data, layout, {
    showTips: false,
    modeBarButtonsToRemove: ["zoom2d", "zoomIn2d", "zoomOut2d", "pan2d", "select2d", "lasso2d", "toImage", "autoScale2d"],
    displaylogo: false,
  });
};

watch(() => props.scenario, () => drawGraph())
onMounted(() => drawGraph())
</script>

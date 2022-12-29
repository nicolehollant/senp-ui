<template>
  <svg viewBox="0 0 200 200">
    <path :d="path" fill="currentColor"></path>
  </svg>
</template>

<script setup>
// much thanks https://georgefrancis.dev/writing/build-a-smooth-animated-blob-with-svg-and-js/
import { spline } from "@georgedoescode/spline";
import { createNoise2D } from "simplex-noise";
import { onMounted, ref } from "vue";

const props = defineProps({
  numPoints: {
    type: Number,
    default: 6,
  },
  speed: {
    type: Number,
    default: 0.001,
  },
  doAnimate: {
    type: Boolean,
    default: true,
  },
  animationMode: {
    type: String,
    default: "slow",
  },
});

const path = ref("");
const points = ref(createPoints());

const simplex = createNoise2D();

function animate() {
  path.value = spline(points.value, 1, true);

  // for every point...
  for (let i = 0; i < points.value.length; i++) {
    const point = points.value[i];

    // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
    const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
    const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
    // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
    const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
    const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

    // update the point's current coordinates
    point.x = x;
    point.y = y;

    // progress the point's x, y values through "time"
    point.noiseOffsetX += props.speed;
    point.noiseOffsetY += props.speed;
  }
  if (props.doAnimate && props.animationMode === "fast") {
    requestAnimationFrame(animate);
  }
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function noise(x, y) {
  // return simplex.noise2D(x, y)
  return simplex(x, y);
}

function createPoints() {
  const points = [];
  // how many points do we need
  const numPoints = props.numPoints;
  // used to equally space each point around the circle
  const angleStep = (Math.PI * 2) / numPoints;
  // the radius of the circle
  const rad = 75;

  for (let i = 1; i <= numPoints; i++) {
    // x & y coordinates of the current point
    const theta = i * angleStep;

    const x = 100 + Math.cos(theta) * rad;
    const y = 100 + Math.sin(theta) * rad;

    // store the point's position
    points.push({
      x: x,
      y: y,
      // we need to keep a reference to the point's original point for when we modulate the values later
      originX: x,
      originY: y,
      // more on this in a moment!
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
    });
  }

  return points;
}

onMounted(() => {
  animate();
  if (props.animationMode !== "fast") {
    requestAnimationFrame(animate);
    requestAnimationFrame(animate);
  }
  if (props.doAnimate && props.animationMode === "slow") {
    setInterval(() => {
      requestAnimationFrame(animate);
    }, 400);
  }
});
</script>

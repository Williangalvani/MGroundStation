<template>
  <div class="row border-bottom bd-lightGray m-3">
    <div class="cell-md-4 d-flex flex-align-center">
      <h3 class="dashboard-section-title text-center text-left-md w-100">
        Joysticks
      </h3>
    </div>
  </div>

  <div class="m-3">
    <div
      data-role="panel"
      data-title-caption="Joystick"
      data-collapsible="true"
      data-title-icon="<span class='mif-gamepad'></span>"
      class="mt-4"
    >
      <div
        id="attitude-div"
        style="width: 100%"
        class="row m-3"
      >
        <div>
          <div style="margin-left: -10px;">
            <div class="joystick-box">
              <div class="x-axis" />
              <div class="y-axis" />
              <div class="circle-outline" />
              <div
                class="joystick-position"
                style="top: 50%; left: 50%;"
              />
            </div>
            <div class="joystick-box">
              <div class="x-axis" />
              <div class="y-axis" />
              <div class="circle-outline" />
              <div
                class="joystick-position"
                style="top: 50%; left: 50%;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { joystickManager, EventType} from "../lib/joystick/joystick"

joystickManager.onChanged((event) => {
    console.log(event, typeof event.type, event.type == EventType.Axis)
})

export default defineComponent({
    name: "Joystick",

    components: {
    },

    data() {
        return {
        }
    },

    created() {
    },

    mounted() {
    },
})
</script>

<style scoped>
.joystick-box {
    position: relative;
    height: 13em;
    width: 13em;
    display: inline-block;
    border: 0.1em solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
}

.x-axis {
    position: absolute;
    left: 0em;
    right: 0em;
    top: 50%;
    height: 0.1em;
    background: rgba(0, 0, 0, 0.9);
    opacity: 0.2;
}

.y-axis {
    position: absolute;
    left: 50%;
    top: 0em;
    bottom: 0em;
    width: 0.1em;
    background: rgba(0, 0, 0, 0.9);
    opacity: 0.2;
}

.joystick-position {
    position: absolute;
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(0, 0, 0, 0.9);
}
</style>

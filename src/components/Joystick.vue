<template>
  <div class="row border-bottom bd-lightGray m-3">
    <div class="cell-md-4 d-flex flex-align-center">
      <h3 class="dashboard-section-title text-center text-left-md w-100">
        Joysticks
      </h3>
    </div>
  </div>

  <li v-for="n in joysticks" v-bind:key="'joystick' + n">
    {{ n }}
  </li>

  <div
    v-for="elefante in elefantes" v-bind:key="'elefante' + elefante"
  >
    {{ elefante }}
  <!--div
    class="m-3"
  >
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
                :style="{ top: LStickVAxis * 100 + '%', left: LStickHAxis * 100 + '%' }"
              />
            </div>
            <div class="joystick-box">
              <div class="x-axis" />
              <div class="y-axis" />
              <div class="circle-outline" />
              <div
                class="joystick-position"
                :style="{ top: RStickVAxis * 100 + '%', left: RStickHAxis * 100 + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

// eslint-disable-next-line no-unused-vars
import { joystickManager, EventType, JoystickEvent, JoystickDetail } from "../lib/joystick/joystick"

export default defineComponent({
    name: "Joystick",

    data() {
        return {
            joysticks: [1, 2, 3],
            elefantes: [
                {
                    oi: 42
                },
                {
                    oi: 43
                },
            ],
            potato: 2,
        }
    },

    mounted() {
        joystickManager.onJoystickUpdate((event) => {
            this.proccessJoystickEvent(event)
            this.$forceUpdate()
        })

        joystickManager.onJoystickStateUpdate((event) => {
            this.proccessJoystickStateEvent(event)
            this.$forceUpdate()
        })
    },

    methods: {
        proccessJoystickEvent(event: Array<Gamepad>) {
            /*this.joysticks =*/ event
        },

        proccessJoystickStateEvent(event: JoystickEvent) {
            /*this.joysticks[event.detail.index] =*/ event.detail.gamepad
            /*
            switch(event.type) {
            case EventType.Axis:
                console.log(event.detail.stick)
                if(event.detail.stick == JoystickDetail.Stick.Left) {
                    if(event.detail.axis == JoystickDetail.Axis.Vertical) {
                        this.LStickVAxis = event.detail.value / 2 + 0.5
                    } else {
                        this.LStickHAxis = event.detail.value / 2 + 0.5
                    }
                } else {
                    if(event.detail.axis == JoystickDetail.Axis.Vertical) {
                        this.RStickVAxis = event.detail.value / 2 + 0.5
                    } else {
                        this.RStickHAxis = event.detail.value / 2 + 0.5
                    }
                }
                break
            default:
                return
            }
            */
        }
    }
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

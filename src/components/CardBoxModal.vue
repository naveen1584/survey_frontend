<script setup>
import { computed } from 'vue'
import { mdiClose } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  largeTitle: {
    type: String,
    default: null
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Done'
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
  value.value = false
  emit(mode)
}

const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel')
</script>

<template>
  <OverlayLayer
    v-show="value"
    @overlay-click="cancel"
  >
    <CardBox
      v-show="value"
      :title="title"
      class="shadow-lg w-full max-h-modal md:w-3/5  lg:w-2/5 z-50"
      rounded="rounded-lg"
      :header-icon="mdiClose"
      modal
      @header-icon-click="cancel"
    >
      <div class="space-y-3">
        <h1
          v-if="largeTitle"
          class="text-2xl"
        >
          {{ largeTitle }}
        </h1>
        <slot />
      </div>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          :label="buttonLabel"
          :color="button"
          @click="confirm"
        />
        <BaseButton
          v-if="hasCancel"
          label="Cancel"
          :color="button"
          outline
          @click="cancel"
        />
      </BaseButtons>
    </CardBox>
  </OverlayLayer>
</template>

<script setup>
import { mdiStarOutline } from '@mdi/js';
import BaseIcon from '@/components/BaseIcon.vue'
import FormField from './FormField.vue';
import FormControl from './FormControl.vue';
import Scale from '@/views/scale.vue'
</script>

<template>
      <p>Hy please take Survey</p>
      <div class="text-center p-2">
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />

      </div>
      <div class=" p-2">
            <Scale />
            <!-- <BaseIcon size="100" h="h-24" w="w-24" :path="Scale" class="ml-4" /> -->

      </div>
      <FormField label="Question" help="Your question. Max 255 characters">
            <FormControl type="textarea" placeholder="Explain how we can help you" />
      </FormField>
</template>
<script setup>
import { mdiStarOutline } from '@mdi/js';
import BaseIcon from '@/components/BaseIcon.vue'
import FormField from './FormField.vue';
import FormControl from './FormControl.vue';
import Scale from '@/views/scale.vue'
import BaseButton from './BaseButton.vue';
import BaseButtons from './BaseButtons.vue';
import CardBox from './CardBox.vue';
import FormCheckRadioPickerVue from './FormCheckRadioPicker.vue';

import { useRouter } from 'vue-router';


const router =useRouter()
const submit=()=>{
      console.log("submit :");
}


const onCancelClick=()=>{
    router.push("/dashboard")
}

const items=   
      [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, {id: 10}]


</script>

<template>
      <!-- <div class="text-center p-2">
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />
            <BaseIcon size="100" h="h-24" w="w-24" :path="mdiStarOutline" class="ml-4" />

      </div>
      <div class=" p-2">
            <Scale />
            <BaseIcon size="100" h="h-24" w="w-24" :path="Scale" class="ml-4" />

      </div> -->
      <CardBox form @submit.prevent="submit" has-table componentClass="p-1">


            <FormField v-for="item in items" :key="item.id" :label="`Question No.${item.id}`"
                  help="Your question. Max 255 characters">
                  <FormControl type="textarea" placeholder="Enter your question here" />
            </FormField>
            <BaseButtons type="justify-end">
                  <BaseButton type="submit" color="info" label="Generate Link" />
                  <BaseButton type="button" @click="onCancelClick" color="danger" label="Cancel" outline />

            </BaseButtons>
      </CardBox>
</template>
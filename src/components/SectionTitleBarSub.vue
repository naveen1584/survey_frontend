<script setup>
import { mdiCog } from "@mdi/js";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";

defineProps({
    baseIcon: {
        type: String,
        default: null
    },
    surveyIcon: {
        type: String,
        default: null
    },
    icon: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    baseLabel: {
        type: String,
        default: null
    },
    surveyLabel: {
        type: String,
        default: null
    }
});

const emit = defineEmits(["bicon-click", "survey-click"]);

const bIconClick = (event) => {
    emit("bicon-click", event);
};

const surveyClick = (event) => {
    emit("survey-click", event);
};
</script>

<template>
    <section class="px-6 sm:px-0 mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
            <BaseIcon v-if="icon" :path="icon" class="mr-3" />
            <h1 class="text-2xl">
                {{ title }}
            </h1>
        </div>
        <div class="flex items-center justify-start">
            <BaseButton v-if="baseIcon || baseLabel" :icon="baseIcon" @click="bIconClick" :label="baseLabel" small />
        </div>
    </section>
</template>

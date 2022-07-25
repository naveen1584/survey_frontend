<script setup>
import { computed, onMounted, reactive } from "vue";
import {
    mdiClose,
    mdiAccountOutline,
    mdiEmailOutline,
    mdiPhoneOutline,
    mdiLockOutline,
    mdiAccount,
    mdiCalendarAccount
} from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import FormField from "../FormField.vue";
import FormControl from "../FormControl.vue";
import { useMainStore } from "@/stores/main.js";

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
        default: "info"
    },
    buttonLabel: {
        type: String,
        default: "Done"
    },
    hasCancel: Boolean,
    modelValue: {
        type: [String, Number, Boolean],
        default: null
    }
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);
const mainStore = useMainStore();
const TakeSurveyDataByID = computed(() => mainStore.getTakeSurveyByID);
const value = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value)
});

const confirmCancel = (mode) => {
    value.value = false;
    emit(mode);
};

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");

const createLink = (id) => {
    let URI = window.location.origin;
    let link = URI + "/#/takeSurvey/" + id;
    return link;
};
</script>

<template>
    <OverlayLayer v-show="value" @overlay-click="cancel">
        <CardBox
            v-show="value"
            :title="title"
            class="shadow-lg w-full max-h-modal md:w-3/5 lg:w-2/5 z-50"
            rounded="rounded-lg"
            :header-icon="mdiClose"
            modal
            @header-icon-click="cancel"
        >
            <div class="space-y-3">
                <h1 v-if="largeTitle" class="text-2xl">
                    {{ largeTitle }}
                </h1>
                <div class="p-2">
                    <div class="flex">
                        <div class="w-1/2 font-bold">Survey ID</div>
                        <div class="w-1/2">{{ TakeSurveyDataByID.surveyID }}</div>
                    </div>
                    <BaseDivider />
                    <div class="flex">
                        <div class="w-1/2 font-bold">Survey Name</div>
                        {{ TakeSurveyDataByID.surveyName }}
                    </div>
                    <BaseDivider />
                    <div class="flex">
                        <div class="w-1/2 font-bold">Admin ID</div>
                        {{ TakeSurveyDataByID.adminID }}
                    </div>
                    <BaseDivider />
                    <div class="flex">
                        <div class="w-1/2 font-bold">Survey Link</div>
                        {{ createLink(TakeSurveyDataByID.surveyID) }}
                    </div>
                    <BaseDivider />
                </div>
            </div>

            <BaseDivider />

            <BaseButtons>
                <BaseButton v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" />
            </BaseButtons>
        </CardBox>
    </OverlayLayer>
</template>

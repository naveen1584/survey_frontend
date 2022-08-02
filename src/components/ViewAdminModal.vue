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
import FormField from "./FormField.vue";
import FormControl from "./FormControl.vue";
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
const userDataById = computed(() => mainStore.getUserByID);

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
                        <div class="w-1/2 font-bold">Name</div>
                        <div class="w-1/2">{{ userDataById.userProfileName }}</div>
                    </div>
                    <BaseDivider />
                    <div class="flex">
                        <div class="w-1/2 font-bold">Email</div>
                        {{ userDataById.userEmail }}
                    </div>
                    <BaseDivider />
                    <div class="flex">
                        <div class="w-1/2 font-bold">Date Of Birth</div>
                        {{ userDataById.DOB }}
                    </div>
                    <BaseDivider />
                    <div class="flex">
                        <div class="w-1/2 font-bold">Phone Number</div>
                        {{ userDataById.userPhone }}
                    </div>
                    <BaseDivider />
                </div>
            </div>

            <BaseDivider />

            <BaseButtons>
                <!-- <BaseButton v-if="buttonLabel" type="submit" :label="buttonLabel" :color="button" /> -->
                <!-- <BaseButton type="reset" color="info" outline label="Reset" /> -->
                <BaseButton v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" />
            </BaseButtons>
        </CardBox>
    </OverlayLayer>
</template>

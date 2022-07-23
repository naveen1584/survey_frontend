<script setup>
import { computed, reactive } from "vue";
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

const form = reactive({
    userProfileName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    roleID: "2",
    DOB: ""
});

const resetForm = () => {
    Object.keys(form).forEach(function (key) {
        key != "roleID" ? (form[key] = "") : "";
    });
};

const submit = () => {
    console.log(form);
    mainStore.createAdmin(form, (res) => {
        console.log(res);
        mainStore.fetch("getUserByType", 2);
        resetForm();
        confirm();
    });
};
</script>

<template>
    <OverlayLayer v-show="value" @overlay-click="cancel">
        <CardBox
            v-show="value"
            @submit.prevent="submit"
            :title="title"
            class="shadow-lg w-full max-h-modal md:w-3/5 lg:w-2/5 z-50"
            rounded="rounded-lg"
            :header-icon="mdiClose"
            form
            modal
            @header-icon-click="cancel"
        >
            <div class="space-y-3">
                <h1 v-if="largeTitle" class="text-2xl">
                    {{ largeTitle }}
                </h1>
                <div class="max-h-[22rem] overflow-auto aside-scrollbars p-2">
                    <FormField label="Name">
                        <FormControl v-model="form.userProfileName" type="Text" :icon="mdiAccount" required />
                    </FormField>
                    <FormField label="Date of Birth">
                        <FormControl
                            v-model="form.DOB"
                            placeholder="Enter Date of Birth"
                            type="date"
                            :icon="mdiCalendarAccount"
                            required
                        />
                    </FormField>
                    <FormField label="Email">
                        <FormControl v-model="form.userEmail" type="email" :icon="mdiEmailOutline" required />
                    </FormField>
                    <FormField label="Phone Number">
                        <FormControl v-model="form.userPhone" type="tel" :icon="mdiPhoneOutline" required />
                    </FormField>
                    <FormField label="Password">
                        <FormControl v-model="form.userPassword" type="password" :icon="mdiLockOutline" required />
                    </FormField>
                </div>
            </div>

            <BaseDivider />

            <BaseButtons>
                <BaseButton type="submit" :label="buttonLabel" :color="button" />

                <BaseButton v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" />
            </BaseButtons>
        </CardBox>
    </OverlayLayer>
</template>

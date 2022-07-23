<script setup>
import { useLayoutStore } from "@/stores/layout.js";
import { useForm, usePage, Head } from "@inertiajs/inertia-vue3";
import { computed } from "vue";
import { mdiAccount, mdiEmail, mdiFormTextboxPassword, mdiCalendarAccount } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
// import FormCheckRadioPicker from "@/components/FormCheckRadioPicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import { useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
// import FormValidationErrors from "@/components/FormValidationErrors.vue";

const router = useRouter();

const form = useForm({
    userProfileName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    roleID: "3",
    DOB: ""
});

useLayoutStore().fullScreenToggle(true);

// const hasTermsAndPrivacyPolicyFeature = computed(() => usePage().props.value.jetstream.hasTermsAndPrivacyPolicyFeature);
const mainStore = useMainStore();

const resetForm = () => {
    Object.keys(form).forEach(function (key) {
        form[key] = "";
    });
};

const submit = () => {
    console.log(form);
    const payload = {
    userProfileName: form.userProfileName,
    userEmail: form.userEmail,
    userPassword: form.userPassword,
    userPhone: form.userPhone,
    roleID: "3",
    DOB: form.DOB
    }
    mainStore.createUser(payload, (res) => {
        console.log(res);
        resetForm();
        confirm();
    });
};
</script>

<template>
    <!-- <Head title="Register" /> -->

    <SectionFullScreen v-slot="{ cardClass, cardRounded }" bg="login">
        <CardBox :class="cardClass" class="my-1" :rounded="cardRounded" form @submit.prevent="submit">
            <!-- <FormValidationErrors /> -->

            <FormField label="Name" class="mb-1" label-for="name" help="Please enter your name">
                <FormControl v-model="form.userProfileName" :icon="mdiAccount" type="text" required />
            </FormField>

            <FormField label="Email" class="mb-1" label-for="email" help="Please enter your email">
                <FormControl v-model="form.userEmail" :icon="mdiEmail" type="email" required />
            </FormField>
            <FormField label="Date Of Birth" class="mb-1" label-for="email" help="Please enter your Date Of Birth">
                <FormControl v-model="form.DOB" :icon="mdiCalendarAccount" type="date" required />
            </FormField>
            <FormField label="Phone Number" class="mb-1" label-for="phone-number" help="Please enter your phone">
                <FormControl v-model="form.userPhone" :icon="mdiCalendarAccount" type="tel" required />
            </FormField>

            <FormField label="Password" class="mb-1" label-for="password" help="Please enter new password">
                <FormControl v-model="form.userPassword" :icon="mdiFormTextboxPassword" type="password" required />
            </FormField>

            <FormField
                label="Confirm Password"
                class="mb-1"
                label-for="password_confirmation"
                help="Please confirm your password"
            >
                <FormControl v-model="form.userPassword" :icon="mdiFormTextboxPassword" type="password" required />
            </FormField>

            <!-- <FormCheckRadioPicker
                v-if="hasTermsAndPrivacyPolicyFeature"
                v-model="form.terms"
                name="remember"
                :options="{ agree: 'I agree to the Terms' }"
            /> -->

            <!-- <BaseDivider /> -->

            <BaseButtons>
                <BaseButton
                    type="submit"
                    color="info"
                    label="Register"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                />
                <BaseButton to="/" color="info" outline label="Login" />
            </BaseButtons>
        </CardBox>
    </SectionFullScreen>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import { useMainStore } from "@/stores/main.js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioPicker from "@/components/FormCheckRadioPicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import { createToast } from "mosha-vue-toastify";

const form = reactive({
    login: "superadmin@mail.com",
    pass: "1122",
    remember: [""]
});

const router = useRouter();
const mainStore = useMainStore();
const submit = () => {
    mainStore.Login({ userEmail: form.login, userPassword: form.pass }, (res) => {
        localStorage.setItem("userData", JSON.stringify(res));
        let loggedInUserID = res?.userRole;
        if (loggedInUserID === 1) {
            router.push("/dashboard");
        } else if (loggedInUserID === 2) {
            router.push("/admin/surveys");
        } else if (loggedInUserID === 3) {
            router.push("/user/dashboard");
        }
    });
};

const onClickSignUp = () => {
    router.push("/register");
};
</script>

<template>
    <SectionFullScreen v-slot="{ cardClass, cardRounded }" bg="login">
        <CardBox :class="cardClass" :rounded="cardRounded" form @submit.prevent="submit">
            <FormField label="Login" help="Please enter your login">
                <FormControl
                    v-model="form.login"
                    :icon="mdiAccount"
                    name="login"
                    autocomplete="username"
                    type="email"
                    placeholder="Enter your Email"
                    required
                />
            </FormField>

            <FormField label="Password" help="Please enter your password">
                <FormControl
                    v-model="form.pass"
                    :icon="mdiAsterisk"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    placeholder="Enter your Password"
                    required
                />
            </FormField>

            <FormCheckRadioPicker v-model="form.remember" name="remember" :options="{ remember: 'Remember' }" />

            <BaseDivider />

            <BaseButtons>
                <BaseButton type="submit" color="info" label="Login" />
                <BaseButton to="/register" color="info" outline label="Sign Up" />
            </BaseButtons>
        </CardBox>
    </SectionFullScreen>
</template>

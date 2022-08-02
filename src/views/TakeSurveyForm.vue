<script setup>
import { computed, ref, onMounted, reactive } from "vue";
import { useMainStore } from "@/stores/main";
import {
    mdiPlus,
    mdiLinkVariant,
    mdiAccount,
    mdiPhoneOutline,
    mdiLockOutline,
    mdiEmailOutline,
    mdiAccountOutline
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import adminSurveysTable from "@/components/userComponents/userSurveysTable.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionTitleBarSub from "@/components/adminComponents/SectionTitleBarSub.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useRouter } from "vue-router";
import ViewSurveyModal from "../components/userComponents/ViewTakeSurveyModal.vue";
import DeleteSurveyModal from "@/components/adminComponents/DeleteSurveyModal.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";

const titleStack = ref(["Admin", "Dashboard"]);

const chartData = ref(null);
const router = useRouter();

const fillChartData = () => {
    chartData.value = chartConfig.sampleChartData();
};
const userData = JSON.parse(localStorage.getItem("userData"));
onMounted(() => {
    mainStore.fetch("getTakeSurveysByUser", userData.detail.userID);
    fillChartData();
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 3));

const transactionBarItems = computed(() => mainStore.history.slice(0, 3));

const isViewSurveyModalActive = ref(false);
const isDeleteSurveyModalActive = ref(false);

const submit = () => {
    window.location.replace(form.surveyLink);
};

const form = reactive({
    surveyLink: ""
});
</script>

<template>
    <SectionMain>
        <SectionTitleBarSub title="Taked Surveys" :baseIcon="mdiPlus" />
        <CardBox form @submit.prevent="submit" has-table componentClass="p-1">
            <div class="mb-10">
                <FormField label="Add link here">
                    <FormControl v-model="form.surveyLink" type="Text" :icon="mdiLinkVariant" required />
                </FormField>
            </div>

            <div
                class="sticky bottom-[25px] p-2 dark:bg-gray-900/70 bg-white border border-gray-100 dark:border-gray-800"
            >
                <BaseButtons type="justify-end">
                    <BaseButton type="submit" color="info" label="Submit" />
                    <BaseButton type="button" @click="onCancelClick" color="danger" label="Cancel" outline />
                </BaseButtons>
            </div>
        </CardBox>
    </SectionMain>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiPlus, mdiAccount, mdiPhoneOutline, mdiLockOutline, mdiEmailOutline, mdiAccountOutline } from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import adminSurveysTable from "./Table.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionTitleBarSub from "@/components/adminComponents/SectionTitleBarSub.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useRouter } from "vue-router";
import ViewSurveyModal from "../../components/userComponents/ViewTakeSurveyModal.vue";
import DeleteSurveyModal from "@/components/adminComponents/DeleteSurveyModal.vue";
const titleStack = ref(["Admin", "Dashboard"]);

const chartData = ref(null);
const router = useRouter();

const fillChartData = () => {
    chartData.value = chartConfig.sampleChartData();
};
const userData = JSON.parse(localStorage.getItem("userData"));
onMounted(() => {
    mainStore.fetch("getTakeSurveys", "");
    fillChartData();
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 3));

const transactionBarItems = computed(() => mainStore.history.slice(0, 3));

const isViewSurveyModalActive = ref(false);
const isDeleteSurveyModalActive = ref(false);

const submit = () => {
    console.log(form);
};
</script>

<template>
    <SectionMain>
        <SectionTitleBarSub title="Taked Surveys" :baseIcon="mdiPlus" />
        <ViewSurveyModal v-model="isViewSurveyModalActive" title="View Survey" has-cancel />
        <DeleteSurveyModal
            v-model="isDeleteSurveyModalActive"
            large-title="Please confirm"
            button="danger"
            has-cancel
        />

        <CardBox has-table>
            <adminSurveysTable
                @view-click="isViewSurveyModalActive = true"
                @delete-click="isDeleteSurveyModalActive = true"
                checkable
            />
        </CardBox>
    </SectionMain>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiPlus, mdiAccount, mdiPhoneOutline, mdiLockOutline, mdiEmailOutline, mdiAccountOutline } from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionTitleBarSub from "@/components/SectionTitleBarSub.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useRouter } from "vue-router";
import AddAdminModal from "@/components/AddAdminModal.vue";
import ViewAdminModal from "../components/ViewAdminModal.vue";
import DeleteAdminModal from "@/components/DeleteAdminModal.vue";

const titleStack = ref(["Admin", "Dashboard"]);

const chartData = ref(null);
const router = useRouter();

const fillChartData = () => {
    chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
    mainStore.fetch("getUserByType", 2);
    fillChartData();
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 3));

const transactionBarItems = computed(() => mainStore.history.slice(0, 3));

const isAddAdminModalActive = ref(false);
const isViewAdminModalActive = ref(false);
const isDeleteAdminModalActive = ref(false);

const submit = () => {
    console.log(form);
};

const surveyClick = () => {
    router.push("/createSurvey");
};
</script>

<template>
    <!-- <SectionTitleBar :title-stack="titleStack" /> -->
    <!-- <SectionHeroBar>Dashboard</SectionHeroBar> -->
    <SectionMain>
        <SectionTitleBarSub
            title="Admins"
            @bicon-click="isAddAdminModalActive = true"
            :baseIcon="mdiPlus"
            baseLabel="Add Admin"
            surveyLabel="Create Survey"
            @survey-click="surveyClick"
            :surveyIcon="mdiPlus"
        />
        <AddAdminModal v-model="isAddAdminModalActive" title="Add Admin" buttonLabel="Submit" has-cancel />
        <ViewAdminModal v-model="isViewAdminModalActive" title="View Admin" has-cancel />
        <!-- <ViewAdminModal v-model="isDeleteAdminModalActive" title="Delete Admin" /> -->
        <DeleteAdminModal v-model="isDeleteAdminModalActive" large-title="Please confirm" button="danger" has-cancel />

        <CardBox has-table>
            <TableSampleClients
                @view-click="isViewAdminModalActive = true"
                @delete-click="isDeleteAdminModalActive = true"
                checkable
            />
        </CardBox>
    </SectionMain>
</template>

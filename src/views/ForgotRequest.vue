<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiPlus, mdiAccount, mdiPhoneOutline, mdiLockOutline, mdiEmailOutline, mdiAccountOutline } from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import forgotRequeststable from "@/components/adminComponents/forgotRequests/forgotRequeststable.vue";

import SectionTitleBarSub from "@/components/adminComponents/SectionTitleBarSub.vue";

const chartData = ref(null);

const fillChartData = () => {
    chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
    mainStore.fetch("getUsersResetRequest", "");
    fillChartData();
});

const mainStore = useMainStore();
</script>

<template>
    <SectionMain>
        <SectionTitleBarSub title="Reset Password Requests" :baseIcon="mdiPlus" />

        <CardBox has-table>
            <forgotRequeststable checkable />
        </CardBox>
    </SectionMain>
</template>

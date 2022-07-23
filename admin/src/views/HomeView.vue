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

const submit = () => {
    console.log(form);
};

const surveyClick = () => {
    router.push("/user");
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
        <!-- <CardBoxModal v-model="isAddAdminModalActive" title="Add Admin">
      <CardBox class="max-h-[22rem] overflow-auto  aside-scrollbars " form @submit.prevent="submit" has-table
        componentClass="p-1">
        <FormField label="First Name">
          <FormControl v-model="form.name" type="email" :icon="mdiAccountOutline" required />
        </FormField>
        <FormField label="Last Name">
          <FormControl v-model="form.name" type="email" :icon="mdiAccountOutline" required />
        </FormField>
        <FormField label="Profile Name">
          <FormControl v-model="form.name" type="email" :icon="mdiAccount" required />
        </FormField>
        <FormField label="Email">
          <FormControl v-model="form.email" type="email" :icon="mdiEmailOutline" required />
        </FormField>
        <FormField label="Phone Number">
          <FormControl v-model="form.phone" type="number" :icon="mdiPhoneOutline" required />
        </FormField>
        <FormField label="Password">
          <FormControl v-model="form.password" type="password" :icon="mdiLockOutline" required />
        </FormField>
      </CardBox>
    </CardBoxModal> -->

        <CardBox has-table>
            <TableSampleClients checkable />
        </CardBox>
    </SectionMain>
</template>

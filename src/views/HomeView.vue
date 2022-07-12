<script setup>
import { computed, ref, onMounted, reactive } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiPlus,
  mdiMail,
  mdiAccount,
  mdiPhoneOutline,
  mdiLockOutline,
  mdiEmailOutline,
  mdiAccountOutline
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import SectionTitleBarSub from '@/components/SectionTitleBarSub.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'


const titleStack = ref(['Admin', 'Dashboard'])

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})


const form = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '',
 
})

const mainStore = useMainStore()

const clientBarItems = computed(() => mainStore.clients.slice(0, 3))

const transactionBarItems = computed(() => mainStore.history.slice(0, 3))

const isAddAdminModalActive = ref(false)

const submit = () => {

}

</script>

<template>
  <!-- <SectionTitleBar :title-stack="titleStack" /> -->
  <SectionHeroBar>Dashboard</SectionHeroBar>
  <SectionMain>

    <SectionTitleBarSub title="Admins" @bicon-click="isAddAdminModalActive=true" :baseIcon="mdiPlus"
      baseLabel="Add Admin" />
    <CardBoxModal v-model="isAddAdminModalActive" title="Add Admin">
      <CardBox class="max-h-[22rem] overflow-auto " form @submit.prevent="submit" has-table componentClass="p-1">
        <FormField label="First Name">
          <FormControl v-model="form.name" type="email" :icon="mdiAccountOutline" />
        </FormField>
        <FormField label="Last Name">
          <FormControl v-model="form.name" type="email" :icon="mdiAccountOutline" />
        </FormField>
        <FormField label="Profile Name">
          <FormControl v-model="form.name" type="email" :icon="mdiAccount" />
        </FormField>
        <FormField label="Email">
          <FormControl v-model="form.email" type="email" :icon="mdiEmailOutline" />
        </FormField>
        <FormField label="Phone Number">
          <FormControl v-model="form.phone" type="number" :icon="mdiPhoneOutline" />
        </FormField>
        <FormField label="Password">
          <FormControl v-model="form.password" type="password" :icon="mdiLockOutline" />
        </FormField>
      </CardBox>
    </CardBoxModal>

    <CardBox has-table>
      <TableSampleClients />
    </CardBox>
  </SectionMain>
</template>

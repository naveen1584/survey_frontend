<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'

const form = reactive({
  login: 'Asad',
  pass: 'Asad',
  remember: ['']
})

const router = useRouter()

const submit = (data) => {
  router.push('/dashboard')
}
</script>

<template>
  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <CardBox
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <FormField
        label="Login"
        help="Please enter your login"
      >
        <FormControl
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
          required
        />
      </FormField>

      <FormField
        label="Password"
        help="Please enter your password"
      >
        <FormControl
          v-model="form.pass"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
          required
        />
      </FormField>

      <FormCheckRadioPicker
        v-model="form.remember"
        name="remember"
        :options="{ remember: 'Remember' }"
      />

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          type="submit"
          color="info"
          label="Login"
        />
        <!-- <BaseButton
          to="/"
          color="info"
          outline
          label="Sign Up"
        /> -->
      </BaseButtons>
    </CardBox>
  </SectionFullScreen>
</template>

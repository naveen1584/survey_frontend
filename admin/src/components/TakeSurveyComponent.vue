<script setup>
import { mdiStarOutline } from '@mdi/js';
import { ref, reactive } from 'vue';
import BaseIcon from '@/components/BaseIcon.vue';
import { useForm, Head, Link } from '@inertiajs/inertia-vue3';
import FormField from './FormField.vue';
import FormControl from './FormControl.vue';
import Scale from '@/views/scale.vue';
import BaseButton from './BaseButton.vue';
import BaseButtons from './BaseButtons.vue';
import CardBox from './CardBox.vue';
import FormCheckRadioPicker from './FormCheckRadioPicker.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const submit = () => {
    console.log('submit :');
};

const onCancelClick = () => {
    router.push('/dashboard');
};

const data = {
    surveyID: 'SR004',
    surveyName: 'Second Survey',
    adminID: 1,
    choiceQuestions: [
        {
            question: 'What is your Country 1',
            options: {
                0: 'US',
                1: 'UK',
                2: 'Island'
            }
        },
        {
            question: 'What is your Country 2',
            options: {
                0: 'US',
                1: 'UK',
                2: 'Island'
            }
        },
        {
            question: 'What is your Country 3',
            options: {
                0: 'US',
                1: 'UK',
                2: 'Island'
            }
        },
        {
            question: 'What is your Country 4',
            options: {
                0: 'US',
                1: 'UK',
                2: 'Island'
            }
        },
        {
            question: 'What is your Country 5',
            options: {
                0: 'US',
                1: 'UK',
                2: 'Island'
            }
        }
    ],
    textQuestions: [
        {
            question: 'What is your city 1',
            options: []
        },
        {
            question: 'What is your city 2',
            options: []
        },
        {
            question: 'What is your city 3',
            options: []
        },
        {
            question: 'What is your city 4',
            options: []
        },
        {
            question: 'What is your city 5',
            options: []
        }
    ]
};
</script>

<template>
    <CardBox form @submit.prevent="submit" has-table componentClass="p-1">
        <FormField
            v-for="item in data.textQuestions"
            :key="item.id"
            :label="`${item.question}`"
            help="Your question. Max 255 characters"
        >
            <FormControl type="textarea" placeholder="Enter your Answer here" />
        </FormField>

        <FormField
            v-for="item in data.choiceQuestions"
            :key="item.id"
            :label="`${item.question}`"
            wrap-body
            help="Please choose one answer"
        >
            <FormCheckRadioPicker name="option-radio" type="radio" :options="`${item.options}`" />
            <label>{{ item.options }}</label>
        </FormField>

        <BaseButtons type="justify-end">
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton type="button" @click="onCancelClick" color="danger" label="Cancel" outline />
        </BaseButtons>
    </CardBox>
</template>

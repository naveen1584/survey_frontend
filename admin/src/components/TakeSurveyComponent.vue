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

const restOptions = (arr) => {
    console.log(arr);
    const obj = {};
    arr.map((key) => {
        obj[key] = key;
    });
    console.log(obj);
    return obj;
};

const data = {
    surveyID: 'SR004',
    surveyName: 'Second Survey',
    adminID: 1,
    choiceQuestions: [
        {
            question: 'What is your Country 1',
            options: ['US', 'UK', 'Island', 'india']
        },
        {
            question: 'What is your Country 2',
            options: ['US', 'UK', 'Island']
        },
        {
            question: 'What is your Country 3',
            options: ['US', 'UK', 'Island']
        },
        {
            question: 'What is your Country 4',
            options: ['US', 'UK', 'Island']
        },
        {
            question: 'What is your Country 5',
            options: ['US', 'UK', 'Island']
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
        <div class="mb-10" v-for="(item, index) in data.choiceQuestions">
            <FormField :key="item.id" :label="`Question No.${index + 1}: ${item.question}`">
                <div></div>
            </FormField>

            <FormField label="Please choose one answer:">
                <FormCheckRadioPicker type="radio" :options="restOptions(item.options)" />
            </FormField>
        </div>
        <div v-for="item in data.textQuestions">
            <FormField :key="item.id" :label="`${item.question}`"><div></div> </FormField>

            <FormField label="Answers">
                <FormControl type="textarea" placeholder="Enter your Answer here" />
            </FormField>
        </div>
        <div class="sticky bottom-[25px] p-2 dark:bg-gray-900/70 bg-white border border-gray-100 dark:border-gray-800">
            <BaseButtons type="justify-end">
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="button" @click="onCancelClick" color="danger" label="Cancel" outline />
            </BaseButtons>
        </div>
    </CardBox>
</template>

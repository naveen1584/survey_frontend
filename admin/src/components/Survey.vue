<script setup>
import { mdiStarOutline } from "@mdi/js";
import BaseIcon from "@/components/BaseIcon.vue";
import { useMainStore } from "@/stores/main.js";
import FormField from "./FormField.vue";
import FormControl from "./FormControl.vue";
import Scale from "@/views/scale.vue";
import BaseButton from "./BaseButton.vue";
import BaseButtons from "./BaseButtons.vue";
import CardBox from "./CardBox.vue";
import FormCheckRadioPickerVue from "./FormCheckRadioPicker.vue";
import { createSurveyObject } from "./predefineObjects";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const userData = JSON.parse(localStorage.getItem("userData"));
const mainStore = useMainStore();
const { createSurvey } = mainStore;
const form = reactive({
    question1: "",
    question1option1: "",
    question1option2: "",
    question1option3: "",
    question1option4: "",
    question2: "",
    question2option1: "",
    question2option2: "",
    question2option3: "",
    question2option4: "",
    question3: "",
    question3option1: "",
    question3option2: "",
    question3option3: "",
    question3option4: "",
    question4: "",
    question4option1: "",
    question4option2: "",
    question4option3: "",
    question4option4: "",
    question5: "",
    question5option1: "",
    question5option2: "",
    question5option3: "",
    question5option4: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: ""
});

const router = useRouter();
const submit = () => {
    createSurveyObject.data.surveyName = form.surveyName;
    createSurveyObject.data.adminID = userData.detail.userID;
    createSurveyObject.data.questions = [
        {
            question: form.question1,
            options: [
                {
                    name: form.question1option1
                },
                {
                    name: form.question1option2
                },
                {
                    name: form.question1option3
                },
                {
                    name: form.question1option4
                }
            ]
        },
        {
            question: form.question2,
            options: [
                {
                    name: form.question2option1
                },
                {
                    name: form.question2option2
                },
                {
                    name: form.question2option3
                },
                {
                    name: form.question2option4
                }
            ]
        },
        {
            question: form.question3,
            options: [
                {
                    name: form.question3option1
                },
                {
                    name: form.question3option2
                },
                {
                    name: form.question3option3
                },
                {
                    name: form.question3option4
                }
            ]
        },
        {
            question: form.question4,
            options: [
                {
                    name: form.question4option1
                },
                {
                    name: form.question4option2
                },
                {
                    name: form.question4option3
                },
                {
                    name: form.question4option4
                }
            ]
        },
        {
            question: form.question5,
            options: [
                {
                    name: form.question5option1
                },
                {
                    name: form.question5option2
                },
                {
                    name: form.question5option3
                },
                {
                    name: form.question5option4
                }
            ]
        },
        {
            question: form.question6,
            options: []
        },
        {
            question: form.question7,
            options: []
        },
        {
            question: form.question8,
            options: []
        },
        {
            question: form.question9,
            options: []
        },
        {
            question: form.question10,
            options: []
        }
    ];
    createSurvey(
        createSurveyObject,
        (res) => {},
        (err) => {}
    );
};

const onCancelClick = () => {
    router.push("/dashboard");
};

const items = [
    { id: 1, options: [1, 2, 3, 4] },
    { id: 2, options: [1, 2, 3, 4] },
    { id: 3, options: [1, 2, 3, 4] },
    { id: 4, options: [1, 2, 3, 4] },
    { id: 5, options: [1, 2, 3, 4] },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 }
];
</script>

<template>
    <CardBox form @submit.prevent="submit" has-table componentClass="p-1">
        <FormField label="Survey Name">
            <FormControl v-model="form.surveyName" placeholder="Enter your option here" required />
        </FormField>
        <div v-for="item in items">
            <FormField :key="item.id" :label="`Question No.${item.id}`" help="Your question. Max 255 characters">
                <FormControl
                    v-model="form[`question${item.id}`]"
                    type="textarea"
                    placeholder="Enter your question here"
                    required
                />
            </FormField>
            <div class="flex">
                <FormField
                    class="w-1/2 pl-1"
                    v-for="option in item.options"
                    :key="option"
                    :label="`Option No.${option}`"
                >
                    <FormControl
                        v-model="form[`question${item.id}option${option}`]"
                        placeholder="Enter your option here"
                        required
                    />
                </FormField>
            </div>
        </div>
        <div class="sticky bottom-[25px] p-2 dark:bg-gray-900/70 bg-white border border-gray-100 dark:border-gray-800">
            <BaseButtons type="justify-end ">
                <BaseButton type="submit" color="info" label="Generate Link" />
                <BaseButton type="button" @click="onCancelClick" color="danger" label="Cancel" outline />
            </BaseButtons>
        </div>
    </CardBox>
</template>

<script setup>
import { mdiStarOutline } from "@mdi/js";
import { computed, ref, reactive, onMounted } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { useForm, Head, Link } from "@inertiajs/inertia-vue3";
import FormField from "./FormField.vue";
import FormControl from "./FormControl.vue";
import Scale from "@/views/scale.vue";
import BaseButton from "./BaseButton.vue";
import BaseButtons from "./BaseButtons.vue";
import CardBox from "./CardBox.vue";
import FormCheckRadioPicker from "./FormCheckRadioPicker.vue";
import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";

const mainStore = useMainStore();
const TakeSurveyDataByID = computed(() => mainStore.getSurveyByIDForTake);
const userData = JSON.parse(localStorage.getItem("userData"));

const router = useRouter();

const submit = () => {
    const payload = {
        data: {
            surveyID: mainStore.getSurveyByIDForTake.surveyID,
            surveyName: mainStore.getSurveyByIDForTake.surveyName,
            adminID: mainStore.getSurveyByIDForTake.adminID,
            userID: userData.detail.userID,
            questions: [
                {
                    question: mainStore.getSurveyByIDForTake.choiceQuestions[0].question,
                    answer: form.choiceQuestionsAnswer1
                },
                {
                    question: mainStore.getSurveyByIDForTake.choiceQuestions[1].question,
                    answer: form.choiceQuestionsAnswer2
                },
                {
                    question: mainStore.getSurveyByIDForTake.choiceQuestions[2].question,
                    answer: form.choiceQuestionsAnswer3
                },
                {
                    question: mainStore.getSurveyByIDForTake.choiceQuestions[3].question,
                    answer: form.choiceQuestionsAnswer4
                },
                {
                    question: mainStore.getSurveyByIDForTake.choiceQuestions[4].question,
                    answer: form.choiceQuestionsAnswer5
                },
                {
                    question: mainStore.getSurveyByIDForTake.textQuestions[0].question,
                    answer: form.textQuestionsAnswer1
                },
                {
                    question: mainStore.getSurveyByIDForTake.textQuestions[1].question,
                    answer: form.textQuestionsAnswer2
                },
                {
                    question: mainStore.getSurveyByIDForTake.textQuestions[2].question,
                    answer: form.textQuestionsAnswer3
                },
                {
                    question: mainStore.getSurveyByIDForTake.textQuestions[3].question,
                    answer: form.textQuestionsAnswer4
                },
                {
                    question: mainStore.getSurveyByIDForTake.textQuestions[4].question,
                    answer: form.textQuestionsAnswer5
                }
            ]
        }
    };
    mainStore.addTakeSurvey(
        payload,
        (res) => {
            router.push("/user/dashboard");
        },
        (err) => {
            console.log(err);
        }
    );
};

const form = reactive({});

const onCancelClick = () => {
    router.push("/user/dashboard");
};

onMounted(() => {
    let getID = createLink();
    console.log(getID);
    mainStore.fetch("getSurveyByIDForTake", getID);
});

const createLink = () => {
    let URI = window.location.hash;
    let data = URI.split("/");
    let ID = data[data.length - 1];
    return ID;
};

const restOptions = (arr) => {
    const obj = {};
    arr.map((key) => {
        obj[key] = key;
    });
    return obj;
};
</script>

<template>
    <CardBox class="p-3" form @submit.prevent="submit" has-table componentClass="p-1">
        <div class="mb-10" v-for="(item, index) in TakeSurveyDataByID.choiceQuestions">
            <FormField :key="index" :label="`Question No.${index + 1}: ${item.question}`">
                <div></div>
            </FormField>

            <FormField label="Please choose one answer:">
                <FormCheckRadioPicker
                    required
                    class="justify-between"
                    v-model="form[`choiceQuestionsAnswer${index + 1}`]"
                    :key="index"
                    type="radio"
                    :options="restOptions(item.options)"
                />
            </FormField>
        </div>
        <div v-for="(item, index) in TakeSurveyDataByID.textQuestions">
            <FormField :key="item.id" :label="`Question No.${index + 6}: ${item.question}`"><div></div> </FormField>

            <FormField label="Answers">
                <FormControl
                    type="textarea"
                    v-model="form[`textQuestionsAnswer${index + 1}`]"
                    placeholder="Enter your Answer here"
                    required
                />
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

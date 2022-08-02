<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";

defineProps({
    checkable: Boolean
});

const mainStore = useMainStore();

const items = computed(() => mainStore.getUsersResetRequest);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);
const perPage = ref(8);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
    items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
    const pagesList = [];

    for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i);
    }

    return pagesList;
});

const remove = (arr, cb) => {
    console.log(arr);
    const newArr = [];

    arr.forEach((item) => {
        if (!cb(item)) {
            newArr.push(item);
        }
    });

    return newArr;
};

const checked = (isChecked, client) => {
    if (isChecked) {
        checkedRows.value.push(client);
    } else {
        checkedRows.value = remove(checkedRows.value, (row) => row.surveyID === client.surveyID);
    }
};

const emit = defineEmits(["view-click", "delete-click", "client-data"]);

const viewClick = (event, client) => {
    mainStore.fetch("getSurveyByID", client.surveyID);

    emit("view-click", event);
};

const deleteClick = (event, client) => {
    mainStore.fetch("getSurveyByID", client.surveyID);

    emit("delete-click", event);
};
</script>

<template>
    <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-gray-800">
        <span
            v-for="checkedRow in checkedRows"
            :key="checkedRow.surveyID"
            class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700"
        >
            {{ checkedRow.surveyName }}
        </span>
    </div>

    <table>
        <thead>
            <tr>
                <th v-if="checkable" />
                <!-- <th /> -->
                <th>Name</th>
                <th>Email</th>
                <th>Recovery Key</th>
                <th>Phone Number</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="client in itemsPaginated" :key="client.userId">
                <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
                <td data-label="Name">
                    {{ client.userProfileName }}
                </td>
                <td data-label="Email">
                    {{ client.userEmail }}
                </td>
                <td data-label="Email">
                    {{ client.recoveryKey }}
                </td>
                <td data-label="Phone Number">
                    {{ client.userPhone }}
                </td>
            </tr>
        </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800">
        <BaseLevel>
            <BaseButtons>
                <BaseButton
                    v-for="page in pagesList"
                    :key="page"
                    :active="page === currentPage"
                    :label="page + 1"
                    small
                    @click="currentPage = page"
                />
            </BaseButtons>
            <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
        </BaseLevel>
    </div>
</template>

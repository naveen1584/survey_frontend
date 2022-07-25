import { defineStore } from "pinia";
import axios from "axios";
import { createToast } from "mosha-vue-toastify";

let userData = JSON.parse(localStorage.getItem("userData"));

let SERVER_URL = "http://localhost:9000";

export const useMainStore = defineStore("main", {
    state: () => ({
        /* User */
        userName: null,
        userEmail: null,
        userAvatar: null,

        /* Field focus with ctrl+k (to register only once) */
        isFieldFocusRegistered: false,

        /* Sample data (commonly used) */
        getUserByType: [],
        getSurveysByAdmin: [],
        getUserByID: {},
        getSurveyByID: {},
        getSurveyByIDForTake: {},
        history: []
    }),
    actions: {
        setUser(payload) {
            if (payload.name) {
                this.userName = payload.name;
            }
            if (payload.email) {
                this.userEmail = payload.email;
            }
            if (payload.avatar) {
                this.userAvatar = payload.avatar;
            }
        },

        Login(body, callBack, errorCallBack = () => {}) {
            axios
                .post(`${SERVER_URL}/auth`, body)
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        createToast(`welcome! ${data.response.detail.userProfileName} login Successfully`, {
                            type: "success"
                        });
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    createToast("In valid userName/Password", { type: "danger" });
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        createAdmin(body, callBack, errorCallBack = () => {}) {
            axios
                .post(`${SERVER_URL}/createUser`, body, { headers: { token: userData?.token } })
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        createToast("Admin Created Successfully", { type: "success" });
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    createToast("Something went wrong try again", { type: "danger" });
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        createUser(body, callBack, errorCallBack = () => {}) {
            axios
                .post(`${SERVER_URL}/createClientUser`, body)
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        createToast("User Register Successfully", { type: "success" });
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    createToast("Something went wrong try again", { type: "danger" });
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        createSurvey(body, callBack, errorCallBack = () => {}) {
            axios
                .post(`${SERVER_URL}/createSurvey`, body, { headers: { token: userData?.token } })
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        createToast("survey Created Successfully", { type: "success" });
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    createToast("Something went wrong try again", { type: "danger" });
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        deleteAdmin(userId, callBack, errorCallBack = () => {}) {
            axios
                .put(`${SERVER_URL}/deleteUser/${userId}`, "", { headers: { token: userData?.token } })
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        createToast("Admin Deleted Successfully", { type: "success" });
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    createToast("Something went wrong try again", { type: "danger" });
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        deleteSurvey(surveyID, callBack, errorCallBack = () => {}) {
            axios
                .put(`${SERVER_URL}/deleteSurvey/${surveyID}`, "", { headers: { token: userData?.token } })
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        createToast("Survey Deleted Successfully", { type: "success" });
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    createToast("Something went wrong try again", { type: "danger" });
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        fetch(sampleDataKey, userID) {
            axios
                .get(`${SERVER_URL}/${sampleDataKey}/${userID}`, {
                    headers: {
                        token: userData?.token
                    }
                })
                .then((response) => {
                    let {
                        data: {
                            response: { result }
                        }
                    } = response;
                    if (response?.data.status?.statusCode === 200) {
                        this[sampleDataKey] = result;
                    }
                })
                .catch((error) => {
                    createToast("Something went wrong try again, Please Refresh Page", { type: "danger" });
                });
        }
    }
});

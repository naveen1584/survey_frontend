import { defineStore } from "pinia";
import axios from "axios";

let userData = JSON.parse(localStorage.getItem("userData"));
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
                .post("http://localhost:9000/auth", body)
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        createAdmin(body, callBack, errorCallBack = () => {}) {
            axios
                .post("http://localhost:9000/createUser", body, { headers: { token: userData?.token } })
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        deleteAdmin(body, callBack, errorCallBack = () => {}) {
            axios
                .post("http://localhost:9000/createUser", body, { headers: { token: userData?.token } })
                .then((response) => {
                    let { data } = response;
                    if (response.data.status.statusCode === 200) {
                        callBack(data.response);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                    errorCallBack(error.message);
                });
        },

        fetch(sampleDataKey, userID) {
            axios
                .get(`http://localhost:9000/${sampleDataKey}/${userID}`, {
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
                    alert(error.message);
                });
        }
    }
});

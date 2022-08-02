import {
    mdiAccountCircle,
    mdiDesktopMac,
    mdiAccountCog,
    mdiGithub,
    mdiLock,
    mdiAlertCircle,
    mdiMonitorShimmer,
    mdiSquareEditOutline,
    mdiTable,
    mdiViewList,
    mdiTelevisionGuide,
    mdiResponsive,
    mdiPalette
} from "@mdi/js";

const userData = JSON.parse(localStorage.getItem("userData"));
let loggedInUserID = userData?.userRole;
let main = [];
let superAdminACL = [
    "General",
    {
        to: "/dashboard",
        icon: mdiAccountCog,
        label: `${"Dashboard"}`,
        role: "superAdmin"
    },
    {
        to: "/allSurveys",
        icon: mdiAccountCog,
        label: `${"Surveys"}`,
        role: "superAdmin"
    },
    {
        to: "/forgotRequests",
        icon: mdiAccountCog,
        label: `${"Forgot Requests"}`,
        role: "superAdmin"
    }
];
let adminACL = [
    "General",
    {
        to: "/admin/surveys",
        icon: mdiAccountCog,
        label: `${"Survey's"}`,
        role: "admin"
    },
    {
        to: "/admin/takeSurveys",
        icon: mdiAccountCog,
        label: `${"Complete Surveys"}`,
        role: "admin"
    }
];
let userACL = [
    "General",
    {
        to: "/user/dashboard",
        icon: mdiAccountCog,
        label: `${"Dashboard"}`,
        role: "user"
    },
    {
        to: "/addLink",
        icon: mdiAccountCog,
        label: `${"Add Survey Link"}`,
        role: "user"
    },
    {
        to: "/user/about",
        icon: mdiAccountCog,
        label: `${"About"}`,
        role: "user"
    },
    {
        to: "/user/contactUs",
        icon: mdiAccountCog,
        label: `${"Contact us"}`,
        role: "user"
    },
    {
        to: "/user/userAgreement",
        icon: mdiAccountCog,
        label: `${"User Agreement"}`,
        role: "user"
    }
];
if (loggedInUserID === 1) {
    main = superAdminACL;
} else if (loggedInUserID === 2) {
    main = adminACL;
} else if (loggedInUserID === 3) {
    main = userACL;
}
export default [main];

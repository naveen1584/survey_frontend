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
        label: `${"Super Admin"}`,
        role: "admin"
    },
    {
        to: "/dashboard2",
        icon: mdiAccountCog,
        label: `${"Super Admin 3"}`,
        role: "admin"
    }
];
let adminACL = [
    "General",
    {
        to: "/dashboard",
        icon: mdiAccountCog,
        label: `${"Admin"}`,
        role: "admin"
    }
];
let userACL = [
    "General",
    {
        to: "/dashboard",
        icon: mdiAccountCog,
        label: `${"User"}`,
        role: "admin"
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

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

const userData = localStorage.getItem("userData");

export default [
    "General",
    [
        {
            to: "/dashboard",
            icon: mdiAccountCog,
            label: `${"Admin"}`
        }
    ]
    // "Examples",
    // [
    //     {
    //         to: "/tables",
    //         label: "Tables",
    //         icon: mdiTable
    //     },
    //     {
    //         to: "/forms",
    //         label: "Forms",
    //         icon: mdiSquareEditOutline
    //     },
    // {
    //     to: "/ui",
    //     label: "UI",
    //     icon: mdiTelevisionGuide
    // },
    // {
    //     to: "/responsive",
    //     label: "Responsive",
    //     icon: mdiResponsive
    // },
    // {
    //     to: "/styles",
    //     label: "Styles",
    //     icon: mdiPalette
    // },
    //     {
    //         to: "/profile",
    //         label: "Profile",
    //         icon: mdiAccountCircle
    //     },
    //
    //     {
    //         to: "/error",
    //         label: "Error",
    //         icon: mdiAlertCircle
    //     }
    // {
    //     label: "Submenus",
    //     subLabel: "Submenus Example",
    //     icon: mdiViewList,
    //     menu: [
    //         {
    //             label: "Sub-item One"
    //         },
    //         {
    //             label: "Sub-item Two"
    //         }
    //     ]
    // }
    // ]
    // "About",
    // [
    //     {
    //         href: "https://tailwind-vue.justboil.me/",
    //         label: "Premium version",
    //         icon: mdiMonitorShimmer,
    //         target: "_blank"
    //     },
    //     {
    //         href: "https://github.com/justboil/admin-one-vue-tailwind",
    //         label: "GitHub",
    //         icon: mdiGithub,
    //         target: "_blank"
    //     }
    // ]
];

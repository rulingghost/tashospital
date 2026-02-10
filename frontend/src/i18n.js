import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";
import Backend from "i18next-http-backend";

// const resources = {
//     tr: {
//         translation: {
//             welcome: 'Hoşgeldin'
//         }
//     },
//     en: {
//         translation: {
//             welcome: 'Welcome'
//         }
//     }
// }

i18n
    .use(initReactI18next)
    .use(Backend)
    .init({
        lng: 'tr',
        // resources
    })

export default i18n
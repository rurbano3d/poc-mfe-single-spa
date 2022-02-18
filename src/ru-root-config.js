import { registerApplication, start } from "single-spa";

import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

import layout from "./layout.html";

const routes = constructRoutes(layout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: (location) => location.pathname === "/",
// });

// registerApplication({
//   name: "@ru/react-single",
//   app: () => System.import("@ru/react-single"),
//   activeWhen: (location) => location.pathname === "/react-single",
// });
applications.forEach(registerApplication);
layoutEngine.activate();
start({
  urlRerouteOnly: true,
});

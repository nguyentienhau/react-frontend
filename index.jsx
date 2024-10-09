import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const pages = import.meta.glob("./source/pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });
const routes = Object.keys(pages).filter((key) => pages[key].default).map(function (key) {
	const path = key.replace("./source/pages", "").replace(/\.(t|j)sx?$/, "").replace(/[A-Za-z0-9\]]\/index$/i, "").replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);
	return { path, component: pages[key].default };
});

root.render(
	<React.StrictMode>
		<Routes>
			{routes.concat({ path: "*", component: routes.find(({ path }) => path === "/not-found").component }).map(function ({ path, component: Component }) {
				return <Route key={path} path={path} element={<Component />} />;
			})}
		</Routes>
	</React.StrictMode>
);

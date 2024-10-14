import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { UserLayout, AdminLayout } from "./source/layouts";
import { NotFoundPage } from "./source/common-pages";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const userPages = import.meta.glob("./source/user-pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });
const adminPages = import.meta.glob("./source/admin-pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });

// prettier-ignore
const userRoutes = Object.keys(userPages).filter((key) => userPages[key].default).map(function (key) {
	const path = key.replace("./source/user-pages", "/user").replace(/\.(t|j)s(x|)?$/, "").replace(/[A-Za-z0-9\]]\/index$/i, "").replace(".", "/").replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);
	return { path, component: userPages[key].default };
});

// prettier-ignore
const adminRoutes = Object.keys(adminPages).filter((key) => adminPages[key].default).map(function (key) {
	const path = key.replace("./source/admin-pages", "/admin").replace(/\.(t|j)s(x|)?$/, "").replace(/[A-Za-z0-9\]]\/index$/i, "").replace(".", "/").replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);
	return { path, component: adminPages[key].default };
});

root.render(
	<React.StrictMode>
		<Routes>
			<Route key="/user" path="/user" element={<UserLayout />}>
				{userRoutes.map(function ({ path, component: Component }) {
					return <Route key={path} path={path} element={<Component />} />;
				})}
			</Route>
			<Route key="/admin" path="/admin" element={<AdminLayout />}>
				{adminRoutes.map(function ({ path, component: Component }) {
					return <Route key={path} path={path} element={<Component />} />;
				})}
			</Route>
			<Route key="*" path="*" element={<NotFoundPage />} />
		</Routes>
	</React.StrictMode>
);

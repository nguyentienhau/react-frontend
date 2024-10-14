const apiUrl = "http://localhost:3000";
const headers = { "Content-Type": "application/json" };
const serviceItemNames = ["create", "read", "update", "delete"];
const serviceItemMethods = ["POST", "GET", "PATCH", "DELETE"];
const serviceSingularNames = ["account", "category", "collection", "product"];
const servicePluralNames = ["accounts", "categories", "collections", "products"];

function setupService(name) {
	return serviceItemNames.reduce(function (accumulator, itemName, index) {
		accumulator[itemName] = async function (data = []) {
			const response = await fetch(`${apiUrl}/${name}`, { method: serviceItemMethods[index], headers, body: JSON.stringify(data) });
			return await response.json();
		};
		return accumulator;
	}, {});
}

export default serviceSingularNames.reduce(function (accumulator, singularName, index) {
	accumulator[`${singularName}Service`] = setupService(servicePluralNames[index]);
	return accumulator;
}, {});

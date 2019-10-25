declare module "*.json" {
	const value: any;
	export default value;
}

declare module "*.gql" {
	const value: any;
	export const kind: any;
	export const definitions: any;
	export default value;
}

declare module "*.graphql" {
	const value: any;
	export default value;
}
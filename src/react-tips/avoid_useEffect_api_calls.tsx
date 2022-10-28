import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'

/* 
	Reasons to avoid api calls in useEffect.

	1. To start getting information, you need to wait until the component is mounted. (*)
	2. To much code is needed to handle api call states. (+)
*/

export const ApiCalls = () => {

	const [isLoading, setIsLoading] = useState(false); //+
	const [error, setError] = useState<unknown>(); //+
	const [data, setData] = useState<unknown>(); //+

	const url = 'https://api.escuelajs.co/api/v1/products'

	async function getProducts() {
		try {
			console.log('Start Fetching'); //*
			setIsLoading(true); //+
			const response = await fetch(url);
			const responseJson = await response.json();
			setData(responseJson); //+
		} catch (error) {
			console.log(error);
			setError(error); //+
		} finally {
			setIsLoading(false); //+
		}
	}

	useEffect(() => {
		console.log('Component Mounted'); //*
		getProducts()
	}, []);

	if(isLoading) return <>Loading....</>;

	if(error) return <>{error}</>
	
	console.log(data);
	return (
		<div>avoid_useEffect_api_calls</div>
	);
}

/* 
	Comparison fetch with other tools 

	1. now you see start fetching is before mounted component. (*)
	2. You can use react query like a global store too.
*/

export const ApiCallsWithReactQuery = () => {

	const url = 'https://api.escuelajs.co/api/v1/products';
	const { isLoading, error , data} = useQuery(['products'],getProducts);

	async function getProducts() {
		try {
			console.log('Start Fetching React Query'); //*
			const response = await fetch(url);
			const responseJson: any[] = await response.json();
			return responseJson
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		console.log('Component Mounted React Query');
	}, []);

	if(isLoading) return <>Loading....</>;

	if(error) return <>{error}</>
	
	console.log(data);
	return (
		<div>query cliente fetch</div>
	);

}
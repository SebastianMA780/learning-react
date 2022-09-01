import { useCallback, useEffect, useState } from "react";

/* 
	In general, the use of useCallback is not intended to perform optimizations,
	but for controlling sideEffects. 
	The cost of rebuilding a function is negligible.

	When a component is re-render its functions are rebuilt then it
	will cause calls from methods that use or have references to them.
*/

export const SideEffects = () => {

	const [counter, setCounter] = useState(0);

	const setCounterWithSideEffects = () => {
		setCounter(prev => prev + 1)
	}

	const setCounterWithNoSideEffects = useCallback(
		() => setCounter(prev => prev + 1), []
	);
	
 	useEffect(() => {
		//this will be executed any time the component re-render.
		console.log('Execution method of side effect reference');
	}, [setCounterWithSideEffects]);

	useEffect(() => {
		/* 
			this will be executed just when setCounterWithNoSideEffects 
			be built for first time. 
		*/
		console.log('Execution method of no side effect reference');
	}, [setCounterWithNoSideEffects]);
	
	return (
		<>
			SideEffects Explanation {counter}
			<button onClick={setCounterWithSideEffects}>
				 +
			</button>
		</>
	)
}
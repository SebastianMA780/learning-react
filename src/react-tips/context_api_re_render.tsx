import { createContext, useContext, useState } from "react"
//Apply for react -v 18- at this time;

/* 
	indiscriminate use of context api represents a performance challenge.
	this due to any component that use it will re-render every time any context value changes,
	it doesn't matter that the component uses that value or not.
*/

type Context = {
	count: number
	setCount: React.Dispatch<React.SetStateAction<number>>
	word: string;
	setWord: React.Dispatch<React.SetStateAction<string>>
	sign: string;
	setSign: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<Partial<Context>>({});

export const RenderingWatchman = () => {
	const [count, setCount] = useState(0);
	const [word, setWord] = useState('');
	const [sign, setSign] = useState('');
	
	return (
		<AppContext.Provider 
			value={{
				count,
				setCount,
				word,
				setWord,
				sign,
				setSign,
			}}
		>
			<>
				<Child />
			</>
		</AppContext.Provider>
	)
}

const Child = () => {
	const { word, setWord } = useContext(AppContext);
	/* 
		this component is re-render even when word, setWord does not change but
		count, setCount, sign, setSign do. 
	*/
	return (
		<>
			<button onClick={() => setWord?.(prev => {
				return prev + 'A'
			})}>
				Increment word
			</button>
			<span>{word}</span>
			<Child2 /><Child3 />
		</>
	);
}

const Child2 = () => {
	const { count, setCount } = useContext(AppContext);
	/* 
		this component is re-render even when count, setCount does not change but
		word, setWord, sign, setSign do. 
	*/
	return (
		<>
			<button onClick={() => setCount?.(prev => {
				return prev + 1;
			})}>
				Increment Number
			</button>
			<span>{count}</span>
		</>
	);
}

const Child3 = () => {
	const { sign, setSign } = useContext(AppContext);
	/* 
		this component is re-render even when sign, setSign does not change but
		word, setWord, count, setCount do. 
	*/
	return (
		<>
			<button onClick={() => setSign?.(prev => {
				return prev + '!$'
			})}>
				Increment sign
			</button>
			<span>{sign}</span>
		</>
	);
}

/* 
	A solution for this could be not ot have large context with manu values but
	separating the contexts to small pieces and  trying to avoid global states,
	this way api context is not added to large component trees.
*/
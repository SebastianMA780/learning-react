// REVIEW!!!!!!

/* 
	Sometimes it will be useful to have a component container 
	that organizes a set of other components,this can be done by 
	slots (pass a component through props).

	Resources:
	
	- https://www.developerway.com/posts/react-component-as-prop-the-right-way

*/

import type { FC } from 'react';

type SpecialContainerProps = {
	children: JSX.Element;
	renderSidebar?: JSX.Element;
	renderOptionalSection?: JSX.Element | null;
	minHeight?: string;
};

/* 
	****Important**** :

	the slot component should always be defined outside of the component
	that use SpecialContainer, otherwise it will re-create this component on every Page re-render, 
	and that is really bad for performance and prone to bugs. 
	If you’re not familiar with how quickly it can turn ugly, 
	this is the article for you: 

	- https://www.developerway.com/posts/how-to-write-performant-react-code

*/

export const SpecialContainer: FC<SpecialContainerProps> = ({
	renderSidebar,
	children,
	renderOptionalSection,
	minHeight,
}) => {
	return (
		<main
			style={{
				minHeight,
			}}
		>
			{renderSidebar && (
				<aside>
					{renderSidebar}
				</aside>
			)}

			<section
				style={{
					width: renderSidebar ? '' : '100%',
				}}
			>
				{children}
			</section>

			{renderOptionalSection && (
				<section>{renderOptionalSection}</section>
			)}
		</main>
	);
};

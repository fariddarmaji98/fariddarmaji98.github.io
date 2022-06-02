import React, { useState } from "react";

import {
	SortCharacterRoot,
	SortCharacterWrapper,
	InputElements,
	OutputWrapper,
	OutputContent
} from './elements';

const words = ['a', 'i', 'u', 'e', 'o'];

const SortCharacterComponent = () => {
	const [outputData1, setOutputData1] = useState('');
	const [outputData2, setOutputData2] = useState('');

	const handleChange = (el) => {
		const valueArr = el.target.value.split("");
		
		const filterValue1 = valueArr.filter(item => words.includes(item.toLowerCase()) && item !== ' ');
		const filterValue2 = valueArr.filter(item => !words.includes(item.toLowerCase()) && item !== ' ');
		
		setOutputData1(filterValue1);
		setOutputData2(filterValue2);
	}

	return (
		<SortCharacterRoot>
			<SortCharacterWrapper>
				<InputElements type="text" placeholder="Input one line of words" onChange={(el) => handleChange(el)} />
				<OutputWrapper>
					<OutputContent>
						{outputData1}
					</OutputContent>
					<OutputContent>
						{outputData2}
					</OutputContent>
				</OutputWrapper>
			</SortCharacterWrapper>
		</SortCharacterRoot>
	);
};

export default SortCharacterComponent;

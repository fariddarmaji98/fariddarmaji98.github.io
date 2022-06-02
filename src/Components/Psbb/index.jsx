import React, { useState, useEffect } from "react";

import {
	PsbbRoot,
	PsbbWrapper,
	InputWrapper,
	ProccessButton,
	OutputWrapper,
	BusInfoWrapper
} from './elements';

import {
	InputElements,
	OutputContent
} from '../SortCharacter/elements';

const RenderBusInfo = ({
	busInfo = []
}) => {
	const oneFamilyOneBus = busInfo.filter(item => !item.length);
	const twoFamilyOneBus = busInfo.filter(item => item.length > 1);

	return (
		<>
			Minimum bus required is {busInfo.length} ({oneFamilyOneBus.length} bus with 1 family and {twoFamilyOneBus.length} bus with two family)
		</>
	)
}

const PsbbComponent = () => {
	const [isEqual, setIsEqual] = useState(true);
	const [isOverload, setIsOverload] = useState(false);
	const [inputNumberFamilies, setInputNumberFamilies] = useState();
	const [inputMemberFamilies, setInputMemberFamilies] = useState();
	const [dataBus, setDataBus] = useState([]);

	useEffect(() => {
		console.log('dataBus', dataBus);
	}, [dataBus]);

	const handleProccess = () => {
		console.clear();

		const numberFamilies = parseInt(inputNumberFamilies);
		const memberArr = inputMemberFamilies.split(' ').map(item => parseInt(item));
		const overload = memberArr.filter(item => item > 4);

		setIsOverload(!!overload.length);
		setIsEqual(memberArr.length === numberFamilies);
		
		if (memberArr.length !== numberFamilies) return;

		const arrDesc = [...handleSortArrDesc(memberArr)];

		let bus = [];
		arrDesc.map((item, index) => {

			if (item >= 4) {
				bus.push(item);
				delete arrDesc[index];
				return;				
			}

			let indexParam = null;
			arrDesc.map((subItem, subIndex) => {
				const lastData = arrDesc.filter(itemFilter => itemFilter !== '');

				if (((item + subItem) < 5) && (lastData.length !== 1)) {
					indexParam = subIndex;
					return;
				}
			})

			if (indexParam !== null) {
				bus.push([item, arrDesc[indexParam]]);
				delete arrDesc[index];
				delete arrDesc[indexParam];
				return;
			}

			if (indexParam === null) {
				bus.push(item);
				delete arrDesc[index];
				return;
			}
		})

		console.log('bus', bus);
		setDataBus([...bus]);
	}

	const handleSortArrAsc = (arr) => arr.sort((a, b) => a - b);
	const handleSortArrDesc = (arr) => arr.sort((a, b) => b - a);

	return (
		<PsbbRoot>
			<PsbbWrapper>
				<InputWrapper>
					<InputElements type="text" placeholder="Input the number of families" onChange={(el) => setInputNumberFamilies(el.target.value)} />
					<InputElements type="text" placeholder="Input the number of members in the family" onChange={(el) => setInputMemberFamilies(el.target.value)} />
					<ProccessButton onClick={() => handleProccess()}>Proccess</ProccessButton>
				</InputWrapper>
				<OutputContent fullWidth>
						{(isEqual && !isOverload && !!dataBus.length) && <RenderBusInfo busInfo={dataBus} />}
						{isOverload && `There is a family that exceeds the capacity of the bus`}
						{(isOverload && !isEqual) && ` and `}
						{!isEqual && `Input must be equal with count of family`}
				</OutputContent>
			</PsbbWrapper>
		</PsbbRoot>
	);
};

export default PsbbComponent;

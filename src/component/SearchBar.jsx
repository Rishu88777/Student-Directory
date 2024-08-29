import React from "react";
import {
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = ({ search, setSearch }) => {

	const handleSearch = (e) => {
		setSearch(e.target.value)
	}

	return (
		<InputGroup size="sm" w={'25rem'} h={'3rem'}>
			<InputLeftElement
				pointerEvents="none"
				children={<Search2Icon color="gray.600" />}
				h={'100%'}
			/>
			<Input type="text" placeholder="Search..." value={search} onChange={handleSearch} border="1px solid #949494" h={'100%'} borderRadius={'5px'} fontSize={'20px'} fontWeight={600} />
		</InputGroup>
	);
};

import { Container } from '@chakra-ui/react';
import React from 'react';
import TableComponent from './Table';

const StudentTable = () => {
	return (
		<Container maxW={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100%'} m={'0px'} >
			<TableComponent />
		</Container>
	)
}

export default StudentTable
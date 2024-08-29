import React, { useEffect, useState } from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Stack,
	Text,
	Button,
	Divider,
	useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, UpDownIcon } from '@chakra-ui/icons';
import { SearchBar } from './SearchBar';
import StudentForm from './StudentForm';


const TableComponent = () => {
	const [student, setStudent] = useState([]);
	const [flag, setFlag] = useState(true);
	const [order, setOrder] = useState('des')
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, setSearch] = useState('');
	const [searchFlag, setSearchFlag] = useState(false);
	const [preserveData, setPreserveData] = useState([]);

	useEffect(() => {
		if (!searchFlag) {
			const students = localStorage.getItem('student');
			flag && setStudent(JSON.parse(students));
			setPreserveData(JSON.parse(students));
		}
	}, [searchFlag, flag])


	useEffect(() => {
		if (search && search.length > 0) {

			let delayDebounceFn = setTimeout(() => {
				searching();
			}, 1000);

			return () => {
				clearTimeout(delayDebounceFn);
			};
		} else {
			setSearchFlag(false)
		}
	}, [search]);


	const handleDelete = (data) => {
		const students = student.filter((item) => item !== data);
		setStudent(students);
		localStorage.setItem('student', JSON.stringify(students));
	}

	const handleSorting = () => {
		setFlag(false)
		const sortedArr = order === 'des' ? ascendingSort() : decendingSort();
		setStudent(sortedArr)
	}

	const ascendingSort = () => {
		setOrder('ase')
		return student.slice().sort((a, b) => {
			const nameA = a.studentName.toLowerCase();
			const nameB = b.studentName.toLowerCase();

			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;
			return 0;
		});
	}

	const decendingSort = () => {
		setOrder('des');
		return student.slice().sort((a, b) => {
			const nameA = a.studentName.toLowerCase();
			const nameB = b.studentName.toLowerCase();

			if (nameA > nameB) return -1;
			if (nameA < nameB) return 1;
			return 0;
		});
	}

	const searching = () => {
		let lowerCaseSearch = search.toLowerCase();

		let searchResults = preserveData.filter((student) =>
			student.studentName.toLowerCase().includes(lowerCaseSearch)
		);
		setSearchFlag(true)
		setStudent(searchResults)
	}


	return (
		<TableContainer w={'95%'} border={'1px solid '} borderColor={'gray.200'} borderRadius={'5px'} py={'20px'}>
			<Stack display={'flex'} justifyContent={'space-between'} flexDirection={'row'} h={'4rem'} mb={'15px'} alignItems={'center'} py={'5px'} px={'15px'} >
				<Text fontSize={'2rem'} fontWeight={900} color={'darkgray'}>Student Directories</Text>
				<Button onClick={onOpen} leftIcon={<AddIcon style={{ color: 'white' }} />} colorScheme='teal' variant='solid' maxW={'10%'} display={'flex'} justifyContent={'space-between'} borderRadius={'3px'} h={'3rem'}>
					Add Student
				</Button>
			</Stack>
			<Divider />
			<Stack py={'1rem'} px={'15px'}><SearchBar search={search} setSearch={setSearch} /></Stack>
			<Table variant='simple'>
				<TableCaption>Student Directory by Rishu Shrivastava</TableCaption>
				<Thead h={'4rem'} bgColor={'gray.100'}>
					<Tr>
						<Th>Student Name  <UpDownIcon cursor={'pointer'} onClick={handleSorting} /></Th>
						<Th>Date Of Birth</Th>
						<Th>Phone Number</Th>
						<Th>Email Id</Th>
						<Th>Father Name</Th>
						<Th>Mother Name </Th>
						<Th>Gender</Th>
						<Th>Address</Th>
						<Th>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{
						student && student.map((item, index) => (
							<Tr key={index}>
								<Td>{item.studentName}</Td>
								<Td>{item.dateOfBirth}</Td>
								<Td >{item.phoneNumber}</Td>
								<Td>{item.emailId}</Td>
								<Td>{item.fatherName}</Td>
								<Td >{item.motherName}</Td>
								<Td>{item.gender}</Td>
								<Td>{item.address}</Td>
								<Td><DeleteIcon color={'red.400'} cursor={'pointer'} onClick={() => handleDelete(item)} /></Td>
							</Tr>
						))
					}
				</Tbody>
			</Table>
			<StudentForm isOpen={isOpen} onClose={onClose} setStudent={setStudent} student={student} />
		</TableContainer>
	)
}

export default TableComponent;

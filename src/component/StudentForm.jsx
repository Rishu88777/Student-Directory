import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
	VStack,
	FormControl,
	FormLabel,
	Input,
	Radio,
	Textarea,
	RadioGroup,
} from '@chakra-ui/react'

const StudentForm = ({ isOpen, onClose, setStudent, student }) => {
	const [formData, setFormData] = useState({
		studentName: '',
		fatherName: '',
		motherName: '',
		dateOfBirth: '',
		emailId: '',
		phoneNumber: '',
		gender: 'male',
		address: '',
	});
	const [dateEntered, setDateEntered] = useState(false);


	const handleChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case 'phoneNumber':
				let newValue;
				if (value.length != '') {
					newValue = parseInt(value, 10).toString();
				}
				if (newValue && newValue.length <= 10) {
					setFormData({ ...formData, [name]: newValue.trim() });
				} else {
					setFormData({ ...formData, [name]: newValue });
				}
				break;
			case 'dateOfBirth':
				const currentDate = new Date(value);
				let threeYearsAgo = new Date();
				threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
				if (currentDate <= threeYearsAgo) {
					setDateEntered(false);
					setFormData({ ...formData, [name]: value });
				} else {
					setDateEntered(true);
					setFormData({ ...formData, [name]: '' })
				}
				break;
			default:
				setFormData({ ...formData, [name]: value });


		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		student.push(formData);
		setStudent(student);
		localStorage.setItem('student', JSON.stringify(student))
		onClose();
		setFormData({
			studentName: '',
			fatherName: '',
			motherName: '',
			dateOfBirth: '',
			emailId: '',
			phoneNumber: '',
			gender: 'male',
			address: '',
		})
	};

	const handleGenderChange = (value) => {
		setFormData({ ...formData, gender: value });
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay bgColor={"rgba(0, 0, 0, 0.8)"} />
			<ModalContent maxWidth={'45rem'}>
				<ModalHeader mx={'auto'}>Add Student</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={handleSubmit}>
						<VStack spacing={4} align="start">
							<FormControl>
								<FormLabel>Name</FormLabel>
								<Input
									type="text"
									name="studentName"
									value={formData.studentName}
									onChange={handleChange}
									isRequired={true}
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Father's Name</FormLabel>
								<Input
									type="text"
									name="fatherName"
									value={formData.fatherName}
									onChange={handleChange}
									isRequired={true}
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Mother's Name</FormLabel>
								<Input
									type="text"
									name="motherName"
									value={formData.motherName}
									onChange={handleChange}
									isRequired={true}
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Date of Birth</FormLabel>
								<Input
									type="date"
									name="dateOfBirth"
									value={formData.dateOfBirth}
									onChange={handleChange}
									isRequired={true}
								/>
								{dateEntered ? <Text color={'red.400'} fontSize={'12px'}>Student age can't be less than 3 years</Text> : null}
							</FormControl>
							<FormControl>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									name="emailId"
									value={formData.emailId}
									onChange={handleChange}
									isRequired={true}
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Phone</FormLabel>
								<Input
									type="tel"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									isRequired={true}
								/>
							</FormControl>

							<FormControl>
								<FormLabel>Gender</FormLabel>
								<RadioGroup name="gender" value={formData.gender} onChange={handleGenderChange} isRequired={true}>
									<Radio value="male">Male</Radio>
									<Radio value="female">Female</Radio>
									<Radio value="other">Other</Radio>
								</RadioGroup>
							</FormControl>

							<FormControl>
								<FormLabel>Address</FormLabel>
								<Textarea
									name="address"
									value={formData.address}
									onChange={handleChange}
									isRequired={true}
								/>
							</FormControl>

							<Button type={'submit'} colorScheme='blue' my={'5px'} mx={'auto'} w={'12rem'}>
								Submit
							</Button>
						</VStack>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default StudentForm
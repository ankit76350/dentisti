import React from "react";
import { Alert } from "react-native";
import MyForm from "../../../components/form/MyForm";
import { validateAppointmentForm } from "../../../helpers/validator";


const appointmentform = () => {


    //Todo : form Start
    const formFields = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', defaultValue: 'Shiva Singh' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', defaultValue: 'shiva@example.com' },
        { name: 'phone', label: 'Phone', type: 'phone', placeholder: 'Enter your phone number', defaultValue: '9876543210' },
        { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your address', defaultValue: 'Pune 3' },
        {
            name: 'dob',
            label: 'Date Of Birth',
            type: 'date',
            defaultValue: '2025-04-01 17:33:57',
        },
        {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            options: [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ],
            defaultValue: 'Male',
        },
        {
            name: 'hospitalName', label: 'Hospital Name', type: 'select',
            options: [
                { label: 'Shri Rama clinics', value: 'Shri Rama clinics' },
                { label: 'Ankit Clinics', value: 'Ankit Clinics' },
                { label: 'UP Clinics', value: 'UP Clinics' },
            ],
            defaultValue: 'Shri Rama clinics',
        },
        {
            name: 'doctorName', label: 'Doctor Name', type: 'select',
            options: [
                { label: 'Dr Kedar kumari', value: 'Dr Kedar kumari' },
                { label: 'Dr. Ankit Kumar', value: 'Dr. Ankit Kumar' },
            ],
            defaultValue: 'Dr. Ankit Kumar',
        },
        {
            name: 'date', label: 'Appointment Date', type: 'date',
            defaultValue: '2025-04-01 17:33:57',
        },
        {
            name: 'time', label: 'Appointment Time', type: 'time',
            defaultValue: '2025-04-01 17:33:57',
        },
    ];

    const handleSubmit = (formData) => {

        if (validateAppointmentForm(formData)) {
            Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
            
        }

    };

    //Todo : form End

    return (
        <>
            {/* <ScreenContainer title="Add New Appointments"> */}
            <MyForm formFields={formFields} onSubmit={handleSubmit} isSubmitting={false} />
            {/* </ScreenContainer> */}

        </>
    )
};


export default appointmentform;
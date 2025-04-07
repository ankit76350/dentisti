import React from "react";
import { Alert } from "react-native";
import MyForm from "../../../components/form/MyForm";


const appointmentform = () => {


    //Todo : form Start
    const formFields = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name', defaultValue: 'Shiva Singh' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', defaultValue: 'shiva@example.com' },
        { name: 'phone', label: 'Phone', type: 'phone', placeholder: 'Enter your phone number', defaultValue: '9876543210' },
        { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your address', defaultValue: 'XYZ' },
        { name: 'dob', label: 'Date Of Birth', type: 'text', placeholder: 'Enter your Date Of Birth', defaultValue: 'XYZ' },
        {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
            defaultValue: 'male',
        },
        {
            name: 'hospitalName', label: 'Hospital Name', type: 'select',
            options: [
                { label: 'TTT', value: 'TTT' },
                { label: 'WWW', value: 'WWW' },
            ],
            defaultValue: 'WWW',
        },
        {
            name: 'doctorName', label: 'Doctor Name', type: 'select',
            options: [
                { label: 'DOCO', value: 'DOCO' },
                { label: 'BBB', value: 'BBB' },
            ],
            defaultValue: 'BBB',
        },
        {
            name: 'date', label: 'Date', type: 'date',
        },
        {
            name: 'time', label: 'Time', type: 'time',
        },
    ];

    const handleSubmit = (formData) => {
        console.log("formData");
        
        // Alert.alert('Form Submitted', JSON.stringify(formData, null, 2));
    };

    //Todo : form End

    return (
        <>
            {/* <ScreenContainer title="Add New Appointments"> */}
                <MyForm formFields={formFields} onSubmit={handleSubmit} />
            {/* </ScreenContainer> */}

        </>
    )
};


export default appointmentform;
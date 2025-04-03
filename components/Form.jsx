import React, { useState } from 'react';
import { View, Button, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import LabelledInputField from './LabelledInputField';
import { hp, wp } from '../helpers/common';

const Form = ({ formFields, onSubmit }) => {
    const initialFormData = formFields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || '';
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{ flex: 1 }}
        >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 , marginTop:hp(3), paddingHorizontal:wp(2.5)}}
                keyboardShouldPersistTaps="handled"
            >
                {formFields.map((field) => (
                    <View key={field.name} style={{ marginBottom: hp(0.05) }}>
                        <LabelledInputField
                            label={field.label}
                            value={formData[field.name]}
                            onChangeText={(text) => handleChange(field.name, text)}
                        />
                    </View>
                ))}
                <Button title="Submit" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
    
};

export default Form;

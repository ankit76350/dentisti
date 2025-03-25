import { Image } from 'react-native';
import React from 'react';

import Patient from '../images/patient.png';


const icons = {
    patient: Patient,

};

const Logo = ({ name, size = 24, style, ...props }) => {
    const IconComponent = icons[name];

    if (!IconComponent) {
        return null; // Return null if icon name is invalid
    }

    return (
        <Image
            source={IconComponent}
            style={[{ width: size, height: size }, style]}
            {...props}
        />
    );
};

export default Logo;

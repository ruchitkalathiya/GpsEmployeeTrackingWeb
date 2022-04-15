import React, { useState } from 'react';
// import { validateInput } from './Vailidation';
import PropTypes from 'prop-types';
import { Form} from 'react-bootstrap';

interface Props {
    name: string;
    value: string;
    // validators: string;
    lablestyleClass: string;
    InputstyleClass: string;
    onChange: (e: object) => void;
    label: string;
    placeholder: string;
    type: string;
    fromrowStyleclass: string;
 
  }

const InputField : React.FC<Props> = ({name,value, lablestyleClass, InputstyleClass, onChange, label, placeholder, type, fromrowStyleclass}) => {

    const [error, setError] = useState(false);

    const handleChange = (event: { target: { value: any; }; }) =>{
        const {value} = event.target;
        // setError(validateInput(validators, value));
        onChange(event);
    }

    return (
        <Form.Group className={`mb-0 ${fromrowStyleclass}`}>
            {label && <Form.Label className={lablestyleClass}>{label}</Form.Label>}

            {type === 'textarea' ? (
                <Form.Control 
                as="textarea" 
                rows={5}
                name={name} 
                className={InputstyleClass}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                />
            ) : (
                <Form.Control 
                name={name}
                value={value}
                className={InputstyleClass} 
                type={type} 
                placeholder={placeholder} 
                onChange={onChange}
                />
            )}

                {/* {error && <span className="text-danger">{error.message}</span>} */}
                
        </Form.Group>
    )
};


export default InputField;

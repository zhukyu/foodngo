import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import '../css/CreditCard.scss';

const CreditCard = ({ setIsValidCard, handleSuccessCard }) => {
    const [cvc, setCVC] = useState('');
    const [expiry, setExpiry] = useState('');
    const [focus, setFocus] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        setIsValidCard(false)
    }, [])

    const handleInputFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValidationErrors({ ...validationErrors, [name]: '' });

        switch (name) {
            case 'cvc':
                setCVC(value);
                break;
            case 'expiry':
                setExpiry(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        if (number.length < 16) {
            errors.number = 'Invalid card number';
        }
        if (name.trim().length < 2) {
            errors.name = 'Invalid name';
        }
        if (expiry.length !== 4) {
            errors.expiry = 'Invalid expiry date';
        }
        if (cvc.length < 3) {
            errors.cvc = 'Invalid CVC';
        }

        if (Object.keys(errors).length > 0) {
            setIsValidCard(false)
            setValidationErrors(errors);
        } else {
            setIsValidCard(true)
            handleSuccessCard()
            console.log('Form submitted successfully');
        }
    };

    return (
        <div id="PaymentForm">
            <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} />
            <form className="credit_card_form" onSubmit={handleSubmit}>
                <div className="credit_card_input_row">
                    <div className="credit_card_input_col">
                        <input
                            className="credit_card_input"
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            value={number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        {validationErrors.number && <p className="error">{validationErrors.number}</p>}
                    </div>
                </div>
                <div className="credit_card_input_row">
                    <div className="credit_card_input_col">
                        <input
                            className="credit_card_input"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        {validationErrors.name && <p className="error">{validationErrors.name}</p>}
                    </div>
                </div>
                <div className="credit_card_input_row">
                    <div className="credit_card_input_col">
                        <input
                            className="credit_card_input card_expiry"
                            type="tel"
                            name="expiry"
                            placeholder="MM/YY Expiry"
                            value={expiry}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        {validationErrors.expiry && <p className="error">{validationErrors.expiry}</p>}
                    </div>
                    <div className="credit_card_input_col">
                        <input
                            className="credit_card_input card_cvc"
                            type="tel"
                            name="cvc"
                            placeholder="CVC"
                            value={cvc}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                        {validationErrors.cvc && <p className="error">{validationErrors.cvc}</p>}
                    </div>
                </div>
                <button type="submit">Validate</button>
            </form>
        </div>
    );
};

export default CreditCard;

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

// Libs
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

// CSS
import styles from './UserForm.module.scss';

// Components
import Input from '../../UI/Input';
import Button from '../../UI/Button';

const UserForm = (props) => {
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["user"]);
    const userForm = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        nit: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Nit'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        birthday: {
            elementType: 'input',
            elementConfig: {
                type: 'date',
                placeholder: 'Birthday'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        github: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Github\'s User'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    }
    const [addUserForm, setAddUserForm] = useState(userForm)

    const addUserHandler = (e) => {
        e.preventDefault();
        const getFormValues = {};

        for (let key in addUserForm) {
            getFormValues[key] = addUserForm[key].value
        }

        setCookie("user", JSON.stringify(getFormValues), {
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
        });
        router.push('/');
    }

    const inputChangeHandler = (e, inputIdentifier) => {
        const updateUserForm = {
            ...addUserForm
        };

        const updateFormElement = {
            ...updateUserForm[inputIdentifier]
        };

        updateFormElement.value = e.target.value;
        updateUserForm[inputIdentifier] = updateFormElement;

        setAddUserForm(updateUserForm);
    }

    const formElementsArray = [];
    for (let key in addUserForm) {
        formElementsArray.push({
            id: key,
            config: addUserForm[key]
        });
    }

    return (
        <div className={styles.UserForm}>
            <form onSubmit={addUserHandler}>
                {formElementsArray.map(element => {
                    return <Input
                        key={element.id}
                        inputtype={element.config.elementType}
                        value={element.config.value}
                        changed={(e) => inputChangeHandler(e, element.id)}
                        elementConfig={element.config.elementConfig} />
                })}
                <Button>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={faUserPlus} />
                    ADD USER
                </Button>
            </form>
        </div>
    );
};

export default UserForm;
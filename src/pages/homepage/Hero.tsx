import React, {useState,useEffect} from 'react'
import { Col, Container, Row, Form, InputGroup,Image, Nav, Navbar, Modal,Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from "react-router-dom";
import InputField from '../../components/Inputfield';
import CheckBox from '../../components/Checkbox';
import DatePicker from "react-datepicker";
import Buttons from '../../components/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';


import Select from 'react-select';
import { ApiGetNoAuth, ApiPostNoAuth, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import i18next from 'i18next';
import { Dropdown, DropdownButton } from "react-bootstrap"
import Swal from 'sweetalert2';
import STORAGEKEY from '../../config/APP/app.config';
import Axios from 'axios';

//import {  } from "../../layouts/header/Header";

// interface Props {
// date?: Date;
// handleDateSelect: () => void;
// handleDateChange: () => void;
// }

interface selectOption {
    value: string,
    label: string
}

interface countryRes {
    data: any,
    message: string,
    status: number
}

const Hero : React.FC = ({}) => {

const [value, onChange] = useState(new Date());
// useState<Date | null>(new Date());
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const resetForm = {
        firstName: '',
        lastName: '',
        userName: '',
        emali: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        nationality: '',
        gender: '',
        bDay: '',
        bMonth: '',
        bYear: '',
        countryCode: '',
        verificationCode: '',
        agreeTerms: false,
        tremsOfUse: false

    };

    const resetFormError = {
        firstNameError: '',
        lastNameError: '',
        userNameError: '',
        emailError: '',
        passwordError: '',
        confirmPassError: '',
        phoneNumberError: '',
        nationalityError: '',
        genderError: '',
        bDayError: '',
        countryCodeError: '',
        verificationError: '',
        bMonthError: '',
        bYearError: '',
        agreeTerms: ''
    };


    const history = useHistory()
    const [signuppopup, setsignuppopup] = useState(false);
    const [welcome, setwelcome] = useState(false);

    const [nationality, setNationality] = useState<selectOption[]>([])
    const [countryCode, setCountryCode] = useState<selectOption[]>([]);


    const [state, setState] = useState(resetForm)
    const [formError, setFormError] = useState(resetFormError)

    const [signupUserName, setSignupUserName] = useState('')
    const [isSubmited, setIsSubmited] = useState(false)
    const [isVerified, setIsVerified] = useState(false);

    const [loginpopup, setloginpopup] = useState(false);

    const [HRloginpopup, setHRloginpopup] = useState(false);
    const [forgotpasspopup, setforgotpasspopup] = useState(false);

    const [terms, setTerms] = useState(false);
    
    const validateForm = () => {
        let errors = {
            firstNameError: '',
            lastNameError: '',
            userNameError: '',
            emailError: '',
            passwordError: '',
            confirmPassError: '',
            phoneNumberError: '',
            nationalityError: '',
            genderError: '',
            bDayError: '',
            countryCodeError: '',
            verificationError: '',
            bMonthError: '',
            bYearError: '',
            agreeTerms: ''
        }

        if (!state.firstName) {
            errors.firstNameError = `${t('signUp.Errors.First_Name')}`

        }

        if (!state.lastName) {
            errors.lastNameError = `${t('signUp.Errors.Last_Name')}`

        }

        if (!state.userName) {
            errors.userNameError = `${t('signUp.Errors.Username')}`

        }
        const validEmail: any = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

        if (!validEmail.test(state.emali)) {
            errors.emailError = `${t('signUp.Errors.Email')}`
        }

        const validPassword: any = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})");

        if (!validPassword.test(state.password)) {
            errors.passwordError = `${t('signUp.Errors.Password')}`

        }

        if (state.password !== state.confirmPassword) {
            errors.confirmPassError = `${t('signUp.Errors.Confirm_Password')}`
        }

        if (!state.confirmPassword) {
            errors.confirmPassError = `${t('signUp.Errors.Confirm_Password')}`
        }

        if (!state.phoneNumber) {
            errors.phoneNumberError = `${t('signUp.Errors.Phone_Numbers')}`
        }

        if (!state.nationality) {
            errors.nationalityError = `${t('signUp.Errors.Country')}`

        }

        if (!state.gender) {
            errors.genderError = `${t('signUp.Errors.Gender')}`

        }

        if (!state.bDay) {
            errors.bDayError = `${t('signUp.Errors.DOB')}`

        }


        if (!state.bMonth) {
            errors.bMonthError = `${t('signUp.Errors.DOB')}`

        }

        if (!state.bYear) {
            errors.bYearError = `${t('signUp.Errors.DOB')}`

        }

        if (!state.countryCode) {
            errors.countryCodeError = "Select country code"
        }

        if (!isVerified || !state.verificationCode) {
            errors.verificationError = `${t('signUp.Errors.Phone_Number')}`
        }

        if(!terms){
            errors.agreeTerms = "Please accept all Terms and Conditions"
        }
        // if (!state.agreeTerms || !state.tremsOfUse) {
        //     errors.agreeTerms = "Please accept above Terms!"
        // }

        setFormError(errors)

        if (!errors.firstNameError &&
            !errors.lastNameError &&
            !errors.userNameError &&
            !errors.emailError &&
            !errors.passwordError &&
            !errors.confirmPassError &&
            !errors.phoneNumberError &&
            !errors.nationalityError &&
            !errors.genderError &&
            !errors.bDayError &&
            !errors.verificationError &&
            !errors.confirmPassError &&
            !errors.agreeTerms) {
            return true;
        }

        return false;

    }


    useEffect(() => {
        getCountryData()
    }, []);


    //Send OTP
    const sendOTP = () => {
        ApiPostNoAuth('user/otp-send', {
            mobile: state.phoneNumber
        })
    }

    //Mobile Number Verification
    const mobileVerification = () => {
        ApiPostNoAuth('user/otp-verify', {
            mobile: state.phoneNumber,
            code: state.verificationCode
        }).then((res) => {
            setIsVerified(true);
            console.log(isVerified);
        })
    }

    //Sign Up---------
    const SignUp = async () => {
        setIsSubmited(true)

        if (!validateForm()) {
            return
        }

        ApiPostNoAuth('user/auth/signup', {
            first_name: state.firstName,
            last_name: state.lastName,
            user_name: state.userName,
            email: state.emali,
            password: state.password,
            gender: state.gender,
            nationality: state.nationality,
            mobile: state.verificationCode,
            dob: `${state.bYear}-${state.bMonth}-${state.bDay}`,
            is_verified: isVerified
        }).then((res) => {
            setSignupUserName(state.firstName + " " + state.lastName)
            setState(resetForm)
            history.push("/");
            setwelcome(true)
            setsignuppopup(false);
        })
            .catch((error) => {
                console.error(error);
            })
    }
    //---------


    const getCountryData = async () => {
        try {
            const res = await ApiGetNoAuth('general/country') as countryRes;
            setNationality(res.data.map((x: any) => {
                return {
                    value: x.name,
                    label: x.name
                }
            }));
            setCountryCode(res.data.map((x: any) => {
                return {
                    value: `+${x.code.toString()}`,
                    label: `+(${x.code.toString()}) ${x.name}`
                }
            }))
        } catch (error) {
            console.log(error);

        }

    }

    //Login-----------
    const loginCredential = {
        email: '',
        pass: '',
    }

    const login_Err = {
        emailError: '',
        passError: '',
    }

    const [statelogin, setStatelogin] = useState(loginCredential);
    const [loginErrors, setLoginErrors] = useState(login_Err);
    const [isloginSubmit, setIsLoginSubmit] = useState(false);
    const [keepMeLogin, setKeepMeLogin] = useState(false);
    const [saveEmail, setSaveEmail] = useState(false);
    const [incorrectPass, setIncorrectPass] = useState('')

    const loginValidation = () => {

        let login_Err = {
            emailError: '',
            passError: '',
        }

        if (statelogin.email === "") {
            login_Err.emailError = `${t('logIn.Errors.Email')}`

        }

        if (statelogin.pass === "") {
            login_Err.passError = `${t('logIn.Errors.Password')}`

        }

        setLoginErrors(login_Err);
        setIncorrectPass('');

        if (!loginErrors.emailError && !loginErrors.passError) {
            return true;
        }

        return false;

    }

    const Login = () => {
        setIsLoginSubmit(true)
        if (!loginValidation()) {
            return
        }

        // ApiPost('user/auth/login', {
        //     email: statelogin.email,
        //     password: statelogin.pass
        // }).then((res: any) => {
        //     setStatelogin(loginCredential);
        //     AuthStorage.setStorageData(STORAGEKEY.token, res.data.token, keepMeLogin);
        //     delete res.data.token;
        //     AuthStorage.setStorageJsonData(STORAGEKEY.userData, res.data, keepMeLogin);
        //     // setloginpopup(false);
        //     history.push("/");
        // })
        // .catch((error) => {
        //     setIncorrectPass(`${t ('logIn.Errors.IncorrectPass')}`)
        // });

        Axios.post('http://192.168.56.1:5000/api/auth/signin', {
            userid: statelogin.email,
            password: statelogin.pass
          })
          .then(function (response) {
                if(response.data.status=="success"){
                    console.log(response);
                    setStatelogin(loginCredential);
                    AuthStorage.setStorageData(STORAGEKEY.token, response.data.accessToken, keepMeLogin);
                    localStorage.setItem("Logincreantials", "admin");
                    delete response.data.accessToken;
                    AuthStorage.setStorageJsonData(STORAGEKEY.userData, response.data.accessToken, keepMeLogin);
                    setloginpopup(false);
                    history.push("/dashboard");
                }
          })
          .catch(function (error) {
                setIncorrectPass(`${t ('logIn.Errors.IncorrectPass')}`)
          });

        console.log(statelogin.email);
        
    }
    //----------

    const Loginhr = () => {
        setIsLoginSubmit(true)
        if (!loginValidation()) {
            return
        }

        // ApiPost('user/auth/login', {
        //     email: statelogin.email,
        //     password: statelogin.pass
        // }).then((res: any) => {
        //     setStatelogin(loginCredential);
        //     AuthStorage.setStorageData(STORAGEKEY.token, res.data.token, keepMeLogin);
        //     delete res.data.token;
        //     AuthStorage.setStorageJsonData(STORAGEKEY.userData, res.data, keepMeLogin);
        //     // setloginpopup(false);
        //     history.push("/");
        // })
        // .catch((error) => {
        //     setIncorrectPass(`${t ('logIn.Errors.IncorrectPass')}`)
        // });

        Axios.post('http://192.168.56.1:5000/api/auth/signin', {
            userid: statelogin.email,
            password: statelogin.pass
          })
          .then(function (response) {
                if(response.data.status=="success"){
                    console.log(response);
                    setStatelogin(loginCredential);
                    AuthStorage.setStorageData(STORAGEKEY.token, response.data.accessToken, keepMeLogin);
                    localStorage.setItem("Logincreantials", "HR");
                    delete response.data.accessToken;
                    AuthStorage.setStorageJsonData(STORAGEKEY.userData, response.data.accessToken, keepMeLogin);
                    setHRloginpopup(false);
                    history.push("/viewloaction");
                }
          })
          .catch(function (error) {
                setIncorrectPass(`${t ('logIn.Errors.IncorrectPass')}`)
          });

        console.log(statelogin.email);
        
    }

    //Resetpassword---------
    const [resetpassError, setResetpassError] = useState('')
    const [resetPassEmail, setResetPassEmail] = useState('')
    const [isResetPassSubmited, setIsResetPassSubmited] = useState(false);
    const [noUserFound, setNoUserFound] = useState('');

    const resetPassValidation = () => {
        let resetpassError = '';

        if (resetPassEmail === "") {
            resetpassError = `${t('Reset_Password.Errors.Email')}`
        }
        setResetpassError(resetpassError)
        setNoUserFound('')

        if (!resetpassError) {
            return true;
        }
        return false;
    }

    const ResetPassword = () => {
        setIsResetPassSubmited(true);
        if (!resetPassValidation()) {
            return
        }

        ApiPostNoAuth('user/sendForgotlink', {
            email: resetPassEmail
        }).then((res: any) => {
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Check your email!!',
                showConfirmButton: true,
                confirmButtonText: "OK"
            }).then((result: any) => {
                if (result.isConfirmed) {
                    history.push("/");
                    setforgotpasspopup(false)
                }
            })
        })
        .catch((error) => {
            setNoUserFound(`${t('Reset_Password.Errors.User_Not_Found')}`) 
        });
    }
    //---------------

    const showsignupmodalbtn = () => {
        setLoginErrors(login_Err)
        setsignuppopup(true)
        setloginpopup(false)
    }

    const loginbtn = () => {
        setFormError(resetFormError)
        setsignuppopup(false)
        setloginpopup(true)
        setwelcome(false)
    }

    const loginbtnnew = () => {
        setFormError(resetFormError)
        setsignuppopup(false)
        setHRloginpopup(true)
        setwelcome(false)
    }

    const forgotpassmodal = () => {
        setloginpopup(false)
        setforgotpasspopup(true)
    }

    const genderoptions = [
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'FeMale' },
        { value: 'OTHER', label: 'Other' }
    ]

    const days = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
    ]

    const months = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' }
    ]


    const years = [
        { value: '1993', label: '1993' },
        { value: '1994', label: '1994' },
        { value: '1995', label: '1995' }
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });


        setStatelogin({
            ...statelogin,
            [e.target.name]: e.target.value,
        });
    };


    useEffect(() => {
        //Sign Up
        if (isSubmited) {
            validateForm();
        }

        //Login
        if (isloginSubmit) {
            loginValidation();
        }

        //Reset Password
        if (isResetPassSubmited) {
            resetPassValidation();
        }
    }, [state, statelogin, resetPassEmail, terms])


    //i18n
    const { t } = useTranslation();

    const location = useLocation();

            return (
            <section className="bg-hero">
                <Container>
                    <Row className="justify-content-center">
                        <Col xl={11} className="hero-content">
                        <h1 className="text-white text-center">Manage Your<br />Organization</h1>
                       
                        </Col>
                    </Row>
                </Container>

                <Modal show={signuppopup} onHide={() => { setsignuppopup(false) }}
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>

                    <Col lg={12}>



                        <Col lg={12} className="modal-signup p-0">
                            <div className="modal-signup-title">
                                <Form>
                                    <h3>{t('signUp.Sign_Up')}</h3>
                                    <Row>
                                        <Col md={6}>
                                            <InputField
                                                label={t('signUp.Name')}
                                                fromrowStyleclass="mt-2"
                                                name="firstName"
                                                value={state.firstName}
                                                placeholder={t('signUp.Placeholder.First_Name')}
                                                type="text"
                                                InputstyleClass={formError.firstNameError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                                lablestyleClass="label-input-style"
                                                onChange={(e: any) => { handleChange(e) }}
                                            />
                                            {isSubmited && formError.firstNameError &&
                                                <p className="text-danger">{formError.firstNameError}</p>
                                            }
                                        </Col>
                                        <Col md={6}>
                                            <InputField
                                                label=""
                                                fromrowStyleclass="mt-4 pt-md-3 pt-0"
                                                name="lastName"
                                                value={state.lastName}
                                                placeholder={t('signUp.Placeholder.Last_Name')}
                                                type="text"
                                                InputstyleClass={formError.lastNameError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                                lablestyleClass="label-input-style"
                                                onChange={(e: any) => { handleChange(e) }}
                                            />
                                            {isSubmited && formError.lastNameError &&
                                                <p className="text-danger">{formError.lastNameError}</p>
                                            }
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col>
                                            <InputField
                                                label={t('signUp.Username')}
                                                fromrowStyleclass="mt-4"
                                                name="userName"
                                                value={state.userName}
                                                placeholder={t('signUp.Placeholder.Username')}
                                                type="text"
                                                InputstyleClass={formError.userNameError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                                lablestyleClass="label-input-style"
                                                onChange={(e: any) => { handleChange(e) }}
                                            />
                                            {isSubmited && formError.userNameError &&
                                                <p className="text-danger">{formError.userNameError}</p>
                                            }
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <InputField
                                                label={t('signUp.Email')}
                                                fromrowStyleclass="mt-4"
                                                name="emali"
                                                value={state.emali}
                                                placeholder={t('signUp.Placeholder.Email')}
                                                type="email"
                                                InputstyleClass={formError.emailError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                                lablestyleClass="label-input-style"
                                                onChange={(e: any) => { handleChange(e) }}
                                            />
                                            {isSubmited && formError.emailError &&
                                                <p className="text-danger">{formError.emailError}</p>
                                            }
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <InputField
                                                label={t('signUp.Password')}
                                                fromrowStyleclass="mt-4"
                                                name="password"
                                                value={state.password}
                                                placeholder={t('signUp.Placeholder.Password')}
                                                type="password"
                                                InputstyleClass={formError.passwordError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                                lablestyleClass="label-input-style"
                                                onChange={(e: any) => { handleChange(e) }}
                                            />
                                            {isSubmited && formError.passwordError &&
                                                <p className="text-danger">{formError.passwordError}</p>
                                            }
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <InputField
                                                label={t('signUp.Confirm_Password')}
                                                fromrowStyleclass="mt-4"
                                                name="confirmPassword"
                                                value={state.confirmPassword}
                                                placeholder={t('signUp.Placeholder.Confirm_Password')}
                                                type="password"
                                                InputstyleClass={formError.confirmPassError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                                lablestyleClass="label-input-style"
                                                onChange={(e: any) => { handleChange(e) }}
                                            />
                                            {isSubmited && formError.confirmPassError &&
                                                <p className="text-danger">{formError.confirmPassError}</p>
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mt-4">
                                            <label className="label-input-style">{t('signUp.Country')}</label>
                                            <Select
                                                className={formError.nationalityError ? "css-e56m7-control danger-border" : "css-e56m7-control"}
                                                options={nationality}
                                                name="nationality"
                                                placeholder={t('signUp.Placeholder.Country')}
                                                onChange={(e: any) => setState({
                                                    ...state,
                                                    nationality: e.value
                                                })}
                                                theme={theme => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#d9eff9',
                                                        primary: '#42B6E6 ',
                                                        fontsize: '15px',
                                                    },
                                                })}
                                            />
                                            {isSubmited && formError.nationalityError &&
                                                <p className="text-danger">{formError.nationalityError}</p>
                                            }
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col className="mt-4">
                                            <label className="label-input-style">{t('signUp.Gender')}</label>
                                            <Select
                                                className={formError.genderError ? "css-e56m7-control danger-border" : "css-e56m7-control"}
                                                options={genderoptions}
                                                label=""
                                                select={state.gender}
                                                name="gender"
                                                placeholder={t('signUp.Placeholder.Gender')}
                                                onChange={(e: any) => setState({
                                                    ...state,
                                                    gender: e.value
                                                })}
                                                theme={theme => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#d9eff9',
                                                        primary: '#42B6E6 ',
                                                        fontsize: '15px',
                                                    },
                                                })}
                                            />
                                            {isSubmited && formError.genderError &&
                                                <p className="text-danger">{formError.genderError}</p>
                                            }
                                        </Col>
                                    </Row>


                                    <Row className="mt-4">
                                        <Col md={12}> <label className="label-input-style">{t('signUp.DOB')}</label></Col>
                                        <Col md={4}>
                                            <Select
                                                className={formError.bDayError ? "css-e56m7-control danger-border" : "css-e56m7-control"}
                                                select={state.bYear}
                                                name="bYear"
                                                options={years}
                                                label=""
                                                placeholder={'YYYY'}
                                                onChange={(e: any) => setState({
                                                    ...state,
                                                    bYear: e.value
                                                })}
                                                theme={theme => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#d9eff9',
                                                        primary: '#42B6E6 ',
                                                        fontsize: '15px',
                                                    },
                                                })}
                                            />

                                        </Col>
                                        <Col md={4} className="mt-md-0 mt-4">
                                            <Select
                                                className={formError.bMonthError ? "css-e56m7-control danger-border" : "css-e56m7-control"}
                                                select={state.bMonth}
                                                name="bMonth"
                                                options={months}
                                                label=""
                                                placeholder={'MM'}
                                                onChange={(e: any) => setState({
                                                    ...state,
                                                    bMonth: e.value
                                                })}
                                                theme={theme => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#d9eff9',
                                                        primary: '#42B6E6 ',
                                                        fontsize: '15px',
                                                    },
                                                })}
                                            />
                                        </Col>
                                        <Col md={4} className="mt-md-0 mt-4">
                                            <Select
                                                className={formError.bYearError ? "css-e56m7-control danger-border" : "css-e56m7-control"}
                                                select={state.bDay}
                                                name="bDay"
                                                options={days}
                                                label=""
                                                placeholder={'DD'}
                                                onChange={(e: any) => setState({
                                                    ...state,
                                                    bDay: e.value
                                                })}
                                                theme={theme => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#d9eff9',
                                                        primary: '#42B6E6 ',
                                                        fontsize: '15px',
                                                    },
                                                })}
                                            />
                                        </Col>
                                        <Col>
                                            {isSubmited && (formError.bDayError || formError.bMonthError || formError.bYearError) ?
                                                <p className="text-danger">{t('signUp.Errors.DOB')}</p>
                                                : null
                                            }
                                        </Col>
                                    </Row>


                                    <Row className="mt-4">
                                        <Col md={12}> <label className="label-input-style">{t('signUp.Phone_Number')}</label></Col>
                                        <Col md={4}>
                                            <Select
                                                className={formError.countryCodeError ? "css-e56m7-control danger-border" : "css-e56m7-control"}
                                                options={countryCode}
                                                name="countryCode"
                                                label=""
                                                placeholder={t('signUp.Placeholder.Phone_Number')}
                                                onChange={(e: any) => setState({
                                                    ...state,
                                                    countryCode: e.value
                                                })}
                                                theme={theme => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#d9eff9',
                                                        primary: '#42B6E6 ',
                                                        fontsize: '15px',
                                                    },
                                                })}
                                            />
                                        </Col>
                                        <Col md={8} className="mt-md-0 mt-4">
                                            <InputField
                                                label=""
                                                fromrowStyleclass=""
                                                name="phoneNumber"
                                                value={state.phoneNumber}
                                                placeholder={t('signUp.Placeholder.Select')}
                                                type="tel"
                                                InputstyleClass={formError.phoneNumberError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                                lablestyleClass="label-input-style"
                                                onChange={(e: any) => { handleChange(e) }}
                                            />
                                            <Buttons ButtonStyle="vocdebtncsss" onClick={sendOTP}>{t('signUp.Send_Verification_Code')}</Buttons>
                                        </Col>
                                        <Col md={12} className="mt-md-2 mt-4">
                                            <InputField
                                                name="verificationCode"
                                                value={state.verificationCode}
                                                label=""
                                                fromrowStyleclass=""
                                                placeholder={t('signUp.Placeholder.Verification_Code')}
                                                type="number"
                                                InputstyleClass={formError.verificationError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                                lablestyleClass="label-input-style"
                                                onChange={(e: any) => { handleChange(e) }}
                                            />
                                            <Buttons ButtonStyle="vocdebtncsss" onClick={mobileVerification}>{t('signUp.Verify')}</Buttons>
                                            {isSubmited && formError.verificationError &&
                                                <p className="text-danger">{formError.verificationError}</p>
                                            }
                                        </Col>

                                    </Row>

                                    <Row className="mt-5">
                                        <Col>
                                            <Form.Group >
                                                <div className="checkboxes checkbox-add_top_15 mr-5">
                                                    <CheckBox
                                                        label={t('signUp.Terms.Agree')}
                                                        type="checkbox"
                                                        name="agree"
                                                        id="agree"
                                                        value=""
                                                        styleCheck="checkmark"
                                                        onChange={(e: any) => { setTerms(!terms)}}                            
                                                    />
                                                </div>
                                            </Form.Group>
                                            <hr />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group >
                                                <div className="checkboxes checkbox-add_top_15 mr-md-5 mr-0">
                                                    <CheckBox
                                                        label={t('signUp.Terms.Term_of_use')}
                                                        type="checkbox"
                                                        name="agreeTerms"
                                                        id="agreeTerms"
                                                        value=""
                                                        styleCheck="checkmark"
                                                        onChange={(e: any) => { }}

                                                    />
                                                </div>
                                            </Form.Group>

                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col>
                                            <Form.Group >
                                                <div className="checkboxes checkbox-add_top_15 mr-md-5 mr-0">
                                                    <CheckBox
                                                        label={t('signUp.Terms.Privacy_and_Cookie')}
                                                        type="checkbox"
                                                        name="tremsOfUse"
                                                        id="tremsOfUse"
                                                        value=""
                                                        styleCheck="checkmark"
                                                        onChange={(e: any) => { }}
                                                        
                                                    />
                                                </div>
                                            </Form.Group>

                                        </Col>
                                    </Row>
                                    {isSubmited && formError.agreeTerms &&
                                        <p className="text-danger">{formError.agreeTerms}</p>
                                    }
                                    <Row className="mt-4">
                                        <Col>
                                            <Buttons ButtonStyle="btn-customs w-100" onClick={() => { SignUp() }}>{t('signUp.Sign_Up')}</Buttons>
                                        </Col>
                                    </Row>
                                    <Row className="py-3">
                                        <Col >
                                            <p className="already-account">{t('signUp.Placeholder.Already_have_account')}<span><Buttons ButtonStyle="trans-btn" onClick={() => { loginbtn() }}>{t('logIn.Log_In')}</Buttons></span></p>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>

                    </Col>

                </Modal.Body>
            </Modal>


            <Modal
                show={welcome} onHide={() => { setwelcome(false) }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className="modal-signup-title">
                        <h3>{t('Welcome.Welcome')}</h3>
                    </div>
                    <div className="welcome-content mt-4">
                        <h5>{t('Welcome.Hi')}, {signupUserName}</h5>
                        <p className="">
                            {t('Welcome.Success')}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Buttons ButtonStyle="btn-customs w-100" onClick={() => { console.log() }}>{t('logIn.Log_In')}</Buttons>

                </Modal.Footer>
            </Modal>

            <Modal
                show={loginpopup} onHide={() => { setloginpopup(false) }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className="modal-signup-title ">
                        <h3>Admin Login</h3>
                    </div>
                    <Row>
                        <Col md={12}>
                            <InputField
                                label={t('Id')}
                                fromrowStyleclass="mt-2"
                                name="email"
                                value={statelogin.email}
                                placeholder={t('Id')}
                                type="text"
                                InputstyleClass={loginErrors.emailError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                lablestyleClass="label-input-style"
                                onChange={(e: any) => { handleChange(e) }}
                            />
                            {loginErrors.emailError &&
                                <p className="text-danger">{loginErrors.emailError}</p>
                            }
                        </Col>

                        <Col md={12}>
                            <InputField
                                label={t('logIn.Password')}
                                fromrowStyleclass="mt-2"
                                name="pass"
                                value={statelogin.pass}
                                placeholder={t('logIn.Placeholder.Password')}
                                type="password"
                                InputstyleClass={loginErrors.passError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                lablestyleClass="label-input-style"
                                onChange={(e: any) => { handleChange(e) }}
                            />
                            {loginErrors.passError &&
                                <p className="text-danger">{loginErrors.passError}</p>
                            }
                            {incorrectPass &&
                                <p className="text-danger">{incorrectPass}</p>
                            }
                        </Col>

                        <Col md={12} className="text-center mt-4">
                            <Buttons ButtonStyle="trans-btn" onClick={() => { forgotpassmodal() }}>{t('logIn.Forgot_Password')}</Buttons>
                        </Col>

                        <Col md={6} className="mt-4 login-form-modal">
                            <CheckBox
                                label={t('logIn.Keep_me_signin')}
                                type="checkbox"
                                name="agree"
                                id="agree"
                                value="agree"
                                styleCheck="checkmark"
                                onChange={(e: any) => { setKeepMeLogin(true) }}
                            />
                        </Col>

                        {/* <Col md={6} className="mt-4 login-form-modal">
                            <CheckBox
                                label={t('logIn.Save_email_add')}
                                type="checkbox"
                                name="agree"
                                id="agree"
                                value="agree"
                                styleCheck="checkmark"
                                onChange={(e: any) => { setSaveEmail(true) }}
                            />
                        </Col> */}
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Buttons ButtonStyle="btn-customs w-100" onClick={Login}>{t('logIn.Log_In')}</Buttons>
                </Modal.Footer>
                <Row className="py-3">
                    {/* <Col >
                        <p className="already-account">{t('logIn.Dont_have_acc')}<span><Buttons ButtonStyle="trans-btn" onClick={() => { showsignupmodalbtn() }}>{t('signUp.Sign_Up')}</Buttons></span></p>
                    </Col> */}
                </Row>

            </Modal>

            <Modal
                show={HRloginpopup} onHide={() => { setHRloginpopup(false) }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className="modal-signup-title ">
                        <h3>HR Login</h3>
                    </div>
                    <Row>
                        <Col md={12}>
                            <InputField
                                label={t('Id')}
                                fromrowStyleclass="mt-2"
                                name="email"
                                value={statelogin.email}
                                placeholder={t('Id')}
                                type="text"
                                InputstyleClass={loginErrors.emailError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                lablestyleClass="label-input-style"
                                onChange={(e: any) => { handleChange(e) }}
                            />
                            {loginErrors.emailError &&
                                <p className="text-danger">{loginErrors.emailError}</p>
                            }
                        </Col>

                        <Col md={12}>
                            <InputField
                                label={t('logIn.Password')}
                                fromrowStyleclass="mt-2"
                                name="pass"
                                value={statelogin.pass}
                                placeholder={t('logIn.Placeholder.Password')}
                                type="password"
                                InputstyleClass={loginErrors.passError ? "custom-input mb-0 danger-border" : "custom-input mb-0"}
                                lablestyleClass="label-input-style"
                                onChange={(e: any) => { handleChange(e) }}
                            />
                            {loginErrors.passError &&
                                <p className="text-danger">{loginErrors.passError}</p>
                            }
                            {incorrectPass &&
                                <p className="text-danger">{incorrectPass}</p>
                            }
                        </Col>

                        <Col md={12} className="text-center mt-4">
                            <Buttons ButtonStyle="trans-btn" onClick={() => { forgotpassmodal() }}>{t('logIn.Forgot_Password')}</Buttons>
                        </Col>

                        <Col md={6} className="mt-4 login-form-modal">
                            <CheckBox
                                label={t('logIn.Keep_me_signin')}
                                type="checkbox"
                                name="agree"
                                id="agree"
                                value="agree"
                                styleCheck="checkmark"
                                onChange={(e: any) => { setKeepMeLogin(true) }}
                            />
                        </Col>

                        {/* <Col md={6} className="mt-4 login-form-modal">
                            <CheckBox
                                label={t('logIn.Save_email_add')}
                                type="checkbox"
                                name="agree"
                                id="agree"
                                value="agree"
                                styleCheck="checkmark"
                                onChange={(e: any) => { setSaveEmail(true) }}
                            />
                        </Col> */}
                    </Row>


                </Modal.Body>
                <Modal.Footer>
                    <Buttons ButtonStyle="btn-customs w-100" onClick={Loginhr}>{t('logIn.Log_In')}</Buttons>
                </Modal.Footer>
                <Row className="py-3">
                    {/* <Col >
                        <p className="already-account">{t('logIn.Dont_have_acc')}<span><Buttons ButtonStyle="trans-btn" onClick={() => { showsignupmodalbtn() }}>{t('signUp.Sign_Up')}</Buttons></span></p>
                    </Col> */}
                </Row>

            </Modal>

            <Modal
                show={forgotpasspopup} onHide={() => { setforgotpasspopup(false) }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className="modal-signup-title">
                        <h3>{t('Reset_Password.Reset_Password')}</h3>
                    </div>

                    <div className="reset-pass-content">
                        <p>{t('Reset_Password.Enter_registered_email')}</p>
                    </div>
                    <Row>
                        <Col md={12}>
                            <InputField
                                label={t('Reset_Password.Email')}
                                fromrowStyleclass="mt-2"
                                name="forgotemail"
                                value={resetPassEmail}
                                placeholder={t('Reset_Password.Placeholder.Email')}
                                type="text"
                                InputstyleClass="custom-input mb-0"
                                lablestyleClass="label-input-style"
                                onChange={(e: any) => { setResetPassEmail(e.target.value) }}
                            />
                            {resetpassError &&
                                <p className="text-danger">{resetpassError}</p>
                            }
                            {noUserFound &&
                                <p className="text-danger">{noUserFound}</p>}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Buttons ButtonStyle="gray-btn w-100" onClick={ResetPassword}> {t('Reset_Password.Send_reset_link')} </Buttons>
                </Modal.Footer>
            </Modal>
                
                <Container className="form-hero-button">
                    <Row>
                        <Col md={12} className="text-center">
                       
                            <Buttons ButtonStyle="btn-customs-transparent mr-md-2 btn-lg" onClick={() => { loginbtn() }} >
                                <FontAwesomeIcon icon={faUser} className="mr-1" /> <span>Admin</span>
                            </Buttons>

                            <Buttons ButtonStyle="btn-customs-transparent ml-md-2 mt-4 mt-md-0 btn-lg" onClick={() => { loginbtnnew() }}>
                                <FontAwesomeIcon icon={faCalendarCheck} className="mr-1" /> <span>HR</span>
                            </Buttons>
                        </Col>
                    </Row>
                </Container>
            </section>
            );
            }

            export default Hero
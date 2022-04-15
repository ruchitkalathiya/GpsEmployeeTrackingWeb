import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Buttons from '../../components/Buttons'
import InputField from '../../components/Inputfield'
import queryString from 'query-string'
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
import { BaseURL } from '../../helper/API/ApiData'

const ForgotPass: React.FC = (props) => {

    const history = useHistory();

    const { search } = useLocation();
    const queryParams = queryString.parse(search);
    
    const [resetPage, setResetPage] = useState({
        resetPass: '',
        resetCPass: '',
        resetFormError: {
            resetPassError: '',
            resetCPassError: '',
        },
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.value", e);

        setResetPage({
            ...resetPage,
            [e.target.name]: e.target.value,
        });
    };

    const forgotPassSucess = () => {
        let resetFormError = {
            resetPassError: '',
            resetCPassError: '',
        }


        const resrtPassword: any = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})");

        if (!resrtPassword.test(resetPage.resetPass)) {
            resetFormError.resetPassError = "Password must be between 8-16 characters and a combination of letters and numbers"
        }

        if (resetPage.resetPass === "") {
            resetFormError.resetPassError = "Enter Your New Password"
        }


        if (resetPage.resetCPass !== resetPage.resetPass) {
            resetFormError.resetCPassError = "Your Password and New Password Not Match"

        }

        setResetPage({
            ...resetPage,
            resetFormError: resetFormError
        })

        if (!resetFormError.resetPassError && !resetFormError.resetCPassError) {
            resetPass();
        }
        
    }

    const resetPass = async () => {
        try {
            const res = await axios.post(BaseURL + 'user/forgot', { password: resetPage.resetPass }, {
                headers: {
                    'Authorization': `Bearer ${queryParams.token}`
                }
            }).then((res)=>{
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Check your email!!',
                    showConfirmButton: true,
                    confirmButtonText: "OK"
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        history.push("/");
                    }
                })
            })
        
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <Container className="resetpass-sec pb-md-0 pb-5">
            <Row className="justify-content-center">
                <Col md={8}>

                    <div className="modal-signup-title ">
                        <h3>Reset Password</h3>
                    </div>
                    <div className="reset-pass-content text-center"><p>Password must be between 8-16 characters and a combination of letters and numbers.</p></div>

                    <InputField
                        label="New Password"
                        fromrowStyleclass="mt-4"
                        name="resetPass"
                        value={resetPage.resetPass}
                        placeholder=""
                        type="password"
                        InputstyleClass="custom-input mb-0"
                        lablestyleClass="label-input-style"
                        onChange={(e: any) => { handleChange(e) }}
                    />
                    {resetPage.resetFormError.resetPassError &&
                        <p className="text-danger">{resetPage.resetFormError.resetPassError}</p>
                    }
                    <InputField
                        label="Confirm Password"
                        fromrowStyleclass="mt-4"
                        name="resetCPass"
                        value={resetPage.resetCPass}
                        placeholder=""
                        type="password"
                        InputstyleClass="custom-input mb-0"
                        lablestyleClass="label-input-style"
                        onChange={(e: any) => { handleChange(e) }}
                    />
                    {resetPage.resetFormError.resetCPassError &&
                        <p className="text-danger">{resetPage.resetFormError.resetCPassError}</p>
                    }

                    <Buttons ButtonStyle="btn-customs w-100 mt-4" onClick={() => { forgotPassSucess() }}> Confirm </Buttons>
                </Col>
            </Row>


        </Container>
    )
}

export default ForgotPass

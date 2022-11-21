import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { Link, useNavigate } from "react-router-dom"
import { login, clearErrors } from "../../actions/userActions"
import { useDispatch, useSelector } from 'react-redux'

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, error, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
    return (
        <Fragment>
            {loading ? <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i> : (
                <><MetaData title={"Sign In"} /><div className='row wrapper'>
                    <div className='col-10 col-lg-5'>
                        <form className='shadow-lg' onSubmit={submitHandler}>
                            <h3 className='mb-3 text-center'>Sign in to HotWheels</h3>
                            {/*Field email*/}
                            <div className='form-group'>
                                <label htmlFor='email_field'>Email</label>
                                <input type="email" id="email_field" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            {/*Field password*/}
                            <div className='form-group'>
                                <label htmlFor='password_field'>Password</label>
                                <input type="password" id="password_field" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <Link to="/password/forgot" className='float-right mb-3 text-center'>Forgot password?</Link>
                            {/*Button Sign Up*/}
                            <button id="login_button" type="submit" className='btn btn-block py-2'>Sign in</button>
                            <Link to="/register" className='float-right mt-3 text-center'>New to HotWheels? Create an account.</Link>
                        </form>
                    </div>
                </div></>
            )}
        </Fragment>
    )
}

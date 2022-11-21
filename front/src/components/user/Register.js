import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData'
import { register, clearErrors } from "../../actions/userActions"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("https://imgs.search.brave.com/EqS0yK0ea5C39tMqsm3vmzxUaIA9fzkoDJSQhPZz84M/rs:fit:820:857:1/g:ce/aHR0cHM6Ly92ZWN0/b3JpZmllZC5jb20v/aW1hZ2VzL2RlZmF1/bHQtYXZhdGFyLWlj/b24tMTIucG5n")
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, error, alert, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar)

        dispatch(register(formData))
    }

    const onChange = e => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            {loading ? <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i> : (
                <Fragment>
                    <MetaData title={'Sign Up'} />
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h3 className="mb-3 text-center">Register to HotWheels</h3>
                                {/*Field name*/}
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input type="name" id="name_field" className="form-control" name='name' value={name} onChange={onChange}
                                    />
                                </div>
                                {/*Field email*/}
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input type="email" id="email_field" className="form-control" name='email' value={email} onChange={onChange}
                                    />
                                </div>
                                {/*Field password*/}
                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input type="password" id="password_field" className="form-control" name='password' value={password} onChange={onChange}
                                    />
                                </div>
                                {/*Field avatar*/}
                                <div className='form-group'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img src={avatarPreview} className="rounded-circle" alt="Avatar preview"></img>
                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input type='file' name='avatar' className='custom-file-input' id='customFile' accept="images/*" onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button id="register_button" type="submit" className="btn btn-block py-2"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

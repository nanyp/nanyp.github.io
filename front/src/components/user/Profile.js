import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Profile = () => {
    const { user, loading } = useSelector(state => state.auth)
    return (
        <Fragment>
            {loading ? <i classname="fa fa-refresh fa-spin fa-2x fa-fw"></i> : (
                <Fragment>
                    <MetaData title={"My Profile"} />
                    <h3 className="mt-5 ml-5">My profile</h3>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.nombre} />
                            </figure>
                            <Link to="/myAccount/updateProfile" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit profile
                            </Link>
                        </div>
                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Registered on: </h4>
                            <p>{String(user.createAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/productos" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

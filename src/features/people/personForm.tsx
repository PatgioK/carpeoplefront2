import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createPersonAsync, fetchPersonAsync } from './peopleSlice';


export function PersonForm() {
    const dispatch = useDispatch();
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [eMail, setEmail] = useState('');

    function submitHandler(e: React.FormEvent<HTMLElement>) {
        e.preventDefault();
        const formData = {
            person: {
                firstname: fname,
                lastname: lname,
                email: eMail,
            }
        }
        dispatch(createPersonAsync(formData));
        resetState();
        dispatch(fetchPersonAsync())
    }

    function resetState() {
        setFName('');
        setLName('');
        setEmail('');
    }

    return <div className="personForm">
        <h3>Create Person Form</h3>
        <form>
            <label>first name: </label>
            <input
            type='text'
            className='form-control text-start'
            name='fnameinput'
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            />
            <label>last name: </label>
            <input
            type='text'
            className='form-control text-start'
            name='lnameinput'
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            />
            <label>email: </label>
            <input
            type='text'
            className='form-control text-start'
            name='eMailinput'
            value={eMail}
            onChange={(e) => setEmail(e.target.value)}
            />

            <button
                type='submit'
                onClick={(e) => submitHandler(e)}>Submit</button>
        </form>
    </div>

}

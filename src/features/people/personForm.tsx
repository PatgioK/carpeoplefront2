import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createPersonAsync } from './peopleSlice';


export function PersonForm() {
    //pass dispatch through props?
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
    }

    function resetState() {
        setFName('');
        setLName('');
        setEmail('');
    }

    return <div className="person form">
        <h1>Create Person Form</h1>
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

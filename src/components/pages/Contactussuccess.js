import React from 'react';
import '../contactsuccess.css';
import { Link } from 'react-router-dom';

export default function contactussuccess() {
    return (
        <>
            <div id='message'>
                Your message has sucess has successfully been submitted!
            </div>
            <div id='message2'>
                We will get back to you soon!
            </div>
            <div id='linkposition'>
                <Link to='/' id="return">Homepage</Link>
            </div>
        </>
    );
}

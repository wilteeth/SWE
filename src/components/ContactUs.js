import React from 'react';
import './ContactUs.css';
import { Link } from 'react-router-dom';

export default function ContactUs() {
    return (
        <div className="contactus-form">
            <div>Contact Us!</div>
            <form className='contactus'>
                <div children='1' class="input-group">
                    <label>Name:</label>
                    <input type="text" />
                </div>
                <div children='2' class="input-group">
                    <label>Location:</label>
                    <input type="text" />
                </div>
                <div children='3' class="input-group">
                    <label>Email:</label>
                    <input type="text" />
                </div>
                <div children='4' class="input-group">
                    <label>Query:</label>
                    <input type="text" />
                </div>

            </form>
            <div id="contactusnow">
                <form action='https://mail.google.com/mail/u/0/#inbox' >
                    <label>
                        <input className='redirect' type="submit" size="100" />
                    </label>
                </form>
            </div>
        </div>);
}
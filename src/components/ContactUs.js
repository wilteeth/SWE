import React, { useRef } from 'react';
import './ContactUs.css';
import emailjs from '@emailjs/browser';
import { useHistory } from 'react-router-dom';


export default function ContactUs() {
    const form = useRef();
    const history = useHistory();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_r7blj98', 'template_ab8laqd', form.current, 'NmILCJCimYepNKbB3')
            .then((result) => {
                console.log(result.text);
                console.log("message sent");
                history.push('/contactsuccess');
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className="contactus-form">
            <div id='contactus-message'>Contact Us!</div>
            <form ref={form} onSubmit={sendEmail}>
                <div className='input-group'>
                    <label>Name:</label>
                    <input type="text" name='from_name' />
                </div>
                <div className='input-group'>
                    <label>Email:</label>
                    <input type="email" name='from_email' />
                </div>
                <div className='input-group'>
                    <label>Query:</label>
                    <input type="text" name='message' />
                </div>
                <div id='button-div'>
                    <input id='contactus-button' type="submit" value="Send" />
                </div>
            </form>
        </div>);
}

// export default function ContactUs() {
//     return (
//     <div className="contactus-form">
//         <div>Contact Us!</div>
//         <form className='contactus'>
//             <div children='1' class="input-group">
//                 <label>Name:</label>
//                 <input type="text" />
//             </div>
//             <div children='2' class="input-group">
//                 <label>Location:</label>
//                 <input type="text" />
//             </div>
//             <div children='3' class="input-group">
//                 <label>Phone Number:</label>
//                 <input type="text" />
//             </div>
//             <div children='4' class="input-group">
//                 <label>Query:</label>
//                 <input type="text" />
//             </div>
//             <div class="input-group">
//                 <button type="submit" class="button">Submit</button>
//             </div>
//         </form>
{/* <div id="contactusnow">
                <form action='https://mail.google.com/mail/u/0/#inbox' >
                    <label>
                        <input className='redirect' type="submit" size="100" />
                    </label>
                </form>
            </div> */}
//     </div>);
// }
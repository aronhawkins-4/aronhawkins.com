import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    message: string;
}

export function ContactFormEmail({ name, email, message }: EmailTemplateProps) {
    return (
        <div>
            <h1>You have received a new contact form submission</h1>
            <p>Name: {name}</p>
            <p>Email address: {email}</p>
            <p>Message: {message}</p>
        </div>
    );
}
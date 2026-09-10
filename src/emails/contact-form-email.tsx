
interface EmailTemplateProps {
    name: string;
    email: string;
    budget: string;
    timeline: string;
    referral: string;
    message: string;
}

export function ContactFormEmail({ name, email, budget, timeline, referral, message }: EmailTemplateProps) {
    return (
        <div>
            <h1>You have received a new contact form submission</h1>
            <p>Name: {name}</p>
            <p>Email address: {email}</p>
            <p>Budget: {budget}</p>
            <p>Timeline: {timeline}</p>
            <p>Referral: {referral}</p>
            <p>Message: {message}</p>
        </div>
    );
}
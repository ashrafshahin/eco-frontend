import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import axios from "axios";
import { Navigate } from "react-router";

export default function ResendVerification() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return setError("Email is required");
        if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email");

        // TODO: connect to POST /resendverificationemail

        const data = await axios.post(`http://localhost:5000/resend-verification/`,
            { email: email }
        );
        
        // navigate("/login");
        
        console.log(data, 'resend email work checking....');
        
        console.log("Resend verification submit:", email);
        
    };

    if (sent) {
        return (
            <AuthLayout title="Verification email sent" subtitle="Check your inbox for the new link.">
                <button onClick={() => setSent(false)} className="text-sm text-amber hover:underline">
                    Send to a different email
                </button>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Resend verification email" subtitle="Enter your email to get a new verification link.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    error={error}
                    placeholder="you@example.com"
                />
                <Button type="submit" loading={loading}>Resend Email</Button>
            </form>
        </AuthLayout>
    );
};
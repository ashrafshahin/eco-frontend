import { useState } from "react";
import { Link } from "react-router";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const errs = {};
        if (!form.email) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.password) errs.password = "Password is required";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        setLoading(true);
        // TODO: connect to POST /login
        console.log("Login submit:", form);
        setTimeout(() => setLoading(false), 800);
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Log in to continue to your account.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    icon={Mail}
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="you@example.com"
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    icon={Lock}
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="••••••••"
                />

                <div className="flex justify-end -mt-1">
                    <Link to="/forgot-password" className="text-xs font-medium text-amber hover:underline underline-offset-2">
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" loading={loading} className="mt-1">
                    Log In
                </Button>
            </form>

            <div className="flex items-center gap-3 my-6">
                <div className="h-px bg-ink/10 flex-1" />
                <span className="text-xs text-slate/60">OR</span>
                <div className="h-px bg-ink/10 flex-1" />
            </div>

            <p className="text-sm text-slate text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-ink font-semibold hover:underline underline-offset-2">
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
};
import { useState } from "react";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { User, Mail, Phone, MapPin } from "../../components/common/Icons";
import { mockUsers } from "../../utils/mockUsers";

export default function Profile() {
    const [form, setForm] = useState({ ...mockUser });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
        setSaved(false);
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.phone.trim()) errs.phone = "Phone is required";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        setSaving(true);
        // TODO: connect to POST /updateuser/:id
        console.log("Update profile:", form);
        setTimeout(() => {
            setSaving(false);
            setSaved(true);
        }, 700);
    };

    const initials = form.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xl font-semibold shrink-0">
                    {initials}
                </div>
                <div>
                    <h1 className="font-display text-2xl font-semibold text-ink">{form.name}</h1>
                    <p className="text-sm text-slate">
                        Member since {new Date(form.joined).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-ink mb-5">Personal Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Full name" name="name" icon={User} value={form.name} onChange={handleChange} error={errors.name} />
                    <InputField label="Email" name="email" type="email" icon={Mail} value={form.email} onChange={handleChange} error={errors.email} />
                    <InputField label="Phone" name="phone" icon={Phone} value={form.phone} onChange={handleChange} error={errors.phone} />
                    <InputField label="City" name="city" value={form.city} onChange={handleChange} />
                    <div className="sm:col-span-2">
                        <InputField label="Address" name="address" icon={MapPin} value={form.address} onChange={handleChange} />
                    </div>
                    <InputField label="Postal code" name="postalCode" value={form.postalCode} onChange={handleChange} />
                </div>

                <div className="flex items-center gap-4 mt-6">
                    <Button type="submit" loading={saving} className="w-auto px-6">
                        Save Changes
                    </Button>
                    {saved && <span className="text-sm text-green-600 font-medium">Saved successfully</span>}
                </div>
            </form>
        </div>
    );
};
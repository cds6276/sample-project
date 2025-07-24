'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    router.push('/thank-you');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        required
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

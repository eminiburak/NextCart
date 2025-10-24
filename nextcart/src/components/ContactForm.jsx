'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const res = await fetch('/actions/contact', {
      method: 'POST',
      body: formData,
    });
    const result = await res.text();
    setMessage(result);
    setLoading(false);
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          className="w-full p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          className="w-full p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows="4"
          className="w-full p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 dark:text-green-400">{message}</p>}
    </div>
  );
}

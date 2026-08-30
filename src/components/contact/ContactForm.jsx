"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const INITIAL_FORM = { name: "", email: "", phone: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [state, setState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formLoadedAt = useRef(null);

  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get("website");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: honeypot,
          formLoadedAt: formLoadedAt.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setState("sent");
      setForm(INITIAL_FORM);
      formLoadedAt.current = Date.now();
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
          Name
        </label>
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={state === "sending"}
          placeholder="Enter your name"
          className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all text-sm disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
          Email
        </label>
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={state === "sending"}
          placeholder="Enter your email"
          className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all text-sm disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
          Phone Number
        </label>
        <input
          required
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={state === "sending"}
          placeholder="Enter your phone number"
          inputMode="tel"
          className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all text-sm disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
          Your Project
        </label>
        <textarea
          required
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          disabled={state === "sending"}
          placeholder="Tell us about your project"
          className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all text-sm resize-none min-h-[120px] disabled:opacity-50"
        />
      </div>

      <motion.button
        type="submit"
        disabled={state === "sending"}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-cream text-ink font-semibold rounded-xl py-3.5 px-6 hover:bg-white active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm shadow-md disabled:opacity-60 cursor-pointer"
      >
        {state === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <span>Submit</span>
        )}
      </motion.button>

      {state === "sent" && (
        <p className="text-sm text-green-400 font-medium text-center pt-2">
          Message sent successfully! I&rsquo;ll get back to you soon.
        </p>
      )}
      {state === "error" && (
        <p className="text-sm text-red-400 font-medium text-center pt-2">
          {errorMessage || "Something went wrong. Please try again or email me directly."}
        </p>
      )}
    </form>
  );
}

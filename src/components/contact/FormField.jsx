"use client";

const BASE_INPUT =
  "w-full bg-[#1c1c1c] rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none transition-all text-sm disabled:opacity-50";

const VALID_INPUT =
  "border border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20";

const INVALID_INPUT =
  "border border-red-400/80 focus:border-red-400 focus:ring-1 focus:ring-red-400/30";

export function getFieldClass(hasError) {
  return `${BASE_INPUT} ${hasError ? INVALID_INPUT : VALID_INPUT}`;
}

export function FormField({
  id,
  label,
  error,
  touched,
  children,
}) {
  const showError = touched && error;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium"
      >
        {label}
      </label>
      {children(showError)}
      {showError && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

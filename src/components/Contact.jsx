import { useId, useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { contact, profile, resume, socials } from "../data/portfolio";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (!emailOk(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 20) e.message = "Write at least 20 characters.";
  return e;
}

const input =
  "w-full min-h-12 rounded-lg border bg-white/[0.06] px-4 py-3 text-base text-white placeholder:text-slate-400 transition focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30";
const border = (bad) => (bad ? "border-red-400" : "border-transparent");

// One info row: circle icon, small label, bold value (a link when href is given).
function Info({ icon: Icon, label, value, href, external }) {
  const content = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/[0.06] text-cyan transition-colors group-hover:bg-cyan group-hover:text-navy">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-slate-400">{label}</span>
        <span className="block break-words text-sm font-semibold text-white">
          {value}
        </span>
      </span>
    </>
  );
  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4"
    >
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-4">{content}</div>
  );
}

export default function Contact() {
  const uid = useId();
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'ready' | 'unconfigured'

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    setStatus(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    if (contact.email.includes("example.com")) return setStatus("unconfigured");
    const company = values.company.trim();
    const mobile = values.mobile.trim();
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      company && `Company: ${company}`,
      mobile && `Mobile: ${mobile}`,
      "",
      values.message.trim(),
    ]
      .filter((l) => l !== false)
      .join("\n");
    const subject = `Portfolio message from ${values.name.trim()}${company ? ` (${company})` : ""}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("ready");
  };

  const err = (k) =>
    errors[k] && (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-sm text-red-400">
        {errors[k]}
      </p>
    );
  const aria = (k) => ({
    id: `${uid}-${k}`,
    "aria-invalid": errors[k] ? "true" : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-navy py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.14),transparent_55%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto w-full max-w-5xl px-5 sm:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Let’s <span className="text-cyan">Connect</span>
          </h2>
          <p className="mt-4 text-slate-300">
            I’m open to opportunities in MERN Stack Development, Full Stack
            Development, and AI Integration. If you have a job opportunity,
            freelance project, or collaboration in mind, feel free to share the
            details below.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-0">
          {/* LEFT: contact info with a vertical divider on large screens */}
          <div className="space-y-6 border-b border-white/10 pb-10 lg:border-b-0 lg:border-r lg:py-4 lg:pr-10">
            <Info
              icon={Mail}
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            {contact.phone && (
              <Info
                icon={Phone}
                label="Phone"
                value={contact.phone}
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
              />
            )}
            <Info icon={MapPin} label="Location" value={profile.location} />
            <Info
              icon={LinkedinIcon}
              label="LinkedIn"
              value="Connect with me"
              href={socials.linkedin}
              external
            />
            <Info
              icon={GithubIcon}
              label="GitHub"
              value="See my code"
              href={socials.github}
              external
            />
            {resume.enabled && (
              <Info
                icon={Download}
                label="Resume"
                value="Download PDF"
                href={resume.url}
              />
            )}
            {contact.whatsapp && (
              <Info
                icon={MessageCircle}
                label="WhatsApp"
                value="Message me"
                href={contact.whatsapp}
                external
              />
            )}
          </div>

          {/* RIGHT: form */}
          <form onSubmit={onSubmit} noValidate className="lg:pl-10">
            <h3 className="font-display text-lg font-semibold">
              Send me a message
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="sr-only">
                  Full name
                </label>
                <input
                  {...aria("name")}
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  value={values.name}
                  onChange={set("name")}
                  className={`${input} ${border(errors.name)}`}
                />
                {err("name")}
              </div>
              <div>
                <label htmlFor={`${uid}-company`} className="sr-only">
                  Company name (optional)
                </label>
                <input
                  {...aria("company")}
                  type="text"
                  autoComplete="organization"
                  placeholder="Company Name (Optional)"
                  value={values.company}
                  onChange={set("company")}
                  className={`${input} ${border(false)}`}
                />
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="sr-only">
                  Email address
                </label>
                <input
                  {...aria("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  value={values.email}
                  onChange={set("email")}
                  className={`${input} ${border(errors.email)}`}
                />
                {err("email")}
              </div>
              <div>
                <label htmlFor={`${uid}-mobile`} className="sr-only">
                  Mobile number (optional)
                </label>
                <input
                  {...aria("mobile")}
                  type="tel"
                  autoComplete="tel"
                  placeholder="Mobile Number (Optional)"
                  value={values.mobile}
                  onChange={set("mobile")}
                  className={`${input} ${border(false)}`}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-message`} className="sr-only">
                  Message
                </label>
                <textarea
                  {...aria("message")}
                  rows={5}
                  placeholder="Message..."
                  value={values.message}
                  onChange={set("message")}
                  className={`${input} resize-y ${border(errors.message)}`}
                />
                {err("message")}
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">
                Opens your email app. Nothing is sent until you press Send
                there.
              </p>
              <button
                type="submit"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan px-8 text-sm font-semibold text-navy transition-colors hover:bg-sky-300"
              >
                Submit <Send size={16} aria-hidden="true" />
              </button>
            </div>

            <div role="status" aria-live="polite" className="mt-4 empty:hidden">
              {status === "ready" && (
                <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                  Your email app should be open. If not, write to{" "}
                  <a
                    className="font-semibold underline"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                  .
                </p>
              )}
            </div>
            <div role="alert" className="mt-4 empty:hidden">
              {status === "unconfigured" && (
                <p className="rounded-lg border border-red-400/50 bg-red-500/10 p-3 text-sm text-red-200">
                  Contact email not set yet. Add it in{" "}
                  <code>contact.email</code> in{" "}
                  <code>src/data/portfolio.js</code>.
                </p>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

import { useState, type FormEvent, useContext } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AuthContext } from "@/pages/_app";
import { login, signup } from "@/lib/api";

export default function Login({ setView }: { setView: (v: "home" | "login") => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  
  const { setToken, setUser } = useContext(AuthContext);
  const router = useRouter();

  const MOCK_USER = { email: "hero@skillquest.gg", password: "adventure" };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    
    try {
      if (mode === "signup") {
        if (!name || !email || !password) {
          setError("All fields are required.");
          return;
        }
        
        // Attempt actual signup with our backend
        try {
          const res = await signup(name, email, password);
          setToken(email); // mock token
          setUser(res.user);
          router.push("/dashboard");
          return;
        } catch (err: any) {
          setError(err.message || "Signup failed");
          return;
        }
      }
      
      if (!email || !password) {
        setError("Enter your email and password.");
        return;
      }
      
      // Attempt actual login with our backend
      try {
        const res = await login(email, password);
        setToken(res.token);
        setUser(res.user);
        router.push("/dashboard");
        return;
      } catch (err: any) {
        // Fallback to hardcoded mock for demo simplicity
        if (email.toLowerCase() === MOCK_USER.email && password === MOCK_USER.password) {
          // Fake auth state
          setToken(MOCK_USER.email);
          setUser({ heroName: "Hero", class: "Novice", level: 1, knowledge_xp: 0, capability_xp: 0 });
          router.push("/dashboard");
        } else {
          setError("That email and password combination doesn't match our records.");
        }
      }
    } catch (e: any) {
      setError(e.message || "An error occurred");
    }
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-bg-base px-6 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-[6px] border border-black/[0.05] shadow-sm w-full max-w-sm p-8"
      >
        <h1 className="font-display text-2xl mb-1" style={{ color: "#0B1F3A" }}>
          {mode === "login" ? "Welcome back" : "Create your adventurer"}
        </h1>
        <p className="text-sm mb-6" style={{ color: "#55637D" }}>
          {mode === "login" ? "Continue your journey where you left off." : "Every adventurer starts as a Novice."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-xs block mb-1" style={{ color: "#55637D" }}>
                Hero name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="HeroName"
                className="w-full rounded-[6px] border border-black/[0.08] px-4 py-2.5 text-sm outline-none focus:border-[#0B1F3A] text-black"
              />
            </div>
          )}
          <div>
            <label className="text-xs block mb-1" style={{ color: "#55637D" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-[6px] border border-black/[0.08] px-4 py-2.5 text-sm outline-none focus:border-[#0B1F3A] text-black"
            />
          </div>
          <div>
            <label className="text-xs block mb-1" style={{ color: "#55637D" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-[6px] border border-black/[0.08] px-4 py-2.5 text-sm outline-none focus:border-[#0B1F3A] text-black"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full py-3 text-sm text-white font-medium mt-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#0B1F3A" }}
          >
            {mode === "login" ? "Continue journey →" : "Begin journey →"}
          </button>
        </form>

        {mode === "login" && (
          <p className="text-xs mt-4" style={{ color: "#55637D" }}>
            Demo credentials: hero@skillquest.gg / adventure
          </p>
        )}

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-xs mt-4 block hover:opacity-80 transition-opacity"
          style={{ color: "#D4AF37" }}
        >
          {mode === "login" ? "New here? Create an adventurer" : "Already have an account? Log in"}
        </button>

        <button onClick={() => setView("home")} className="text-xs mt-6 block hover:opacity-80 transition-opacity" style={{ color: "#55637D" }}>
          ← Back to home
        </button>
      </motion.div>
    </section>
  );
}

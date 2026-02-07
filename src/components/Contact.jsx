import React, { useState } from "react";
import supabase from "../config/SupabaseClient";
import toast from "react-hot-toast";
import { ShieldCheck, AlertTriangle, X } from "lucide-react";

const Contact = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    objective: "",
  });

  const nextStep = () => {
    if (step === 1 && !formData.name.trim()) return;
    if (step === 2 && !formData.contact.trim()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step < 3) {
        nextStep();
      } else if (formData.objective.trim()) {
        handleSubmit(e);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.objective.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          contact_info: formData.contact,
          message: formData.objective,
        },
      ]);

      if (error) throw error;

      // --- CUSTOM SUCCESS TOAST ---
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-[#020617]/90 border border-emerald-500/50 backdrop-blur-xl shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <ShieldCheck className="h-10 w-10 text-emerald-500" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-white uppercase tracking-tighter">
                  Deployment Successful
                </p>
                <p className="mt-1 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Data encrypted and sent to secure node.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-white/5">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-[10px] font-mono text-slate-500 hover:text-white transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      ), { duration: 5000 });

      setFormData({ name: "", contact: "", objective: "" });
      setStep(1);
    } catch (error) {
      console.error("Transmission Error:", error.message);
      
      // --- ERROR TOAST ---
      toast.error("Packet Loss: Transmission Failed", {
        style: {
          background: "#020617",
          color: "#ef4444",
          border: "1px solid #ef4444",
          fontFamily: "monospace",
          fontSize: "12px",
          textTransform: "uppercase",
        },
        icon: <AlertTriangle size={18} />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
          Start <span className="text-blue-500">_Engagement</span>
        </h2>
        <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em]">
          Secure Channel: AES-256 Encrypted
        </p>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-50"></div>
        
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-8">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="block font-mono text-emerald-500 text-sm tracking-widest uppercase mb-2">
                [Step_01]: Identity_Authentication
              </label>
              <input
                type="text"
                placeholder="ENTER YOUR NAME..."
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-white font-mono focus:border-blue-500 focus:outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <button 
                type="button" 
                onClick={nextStep} 
                disabled={!formData.name.trim()}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all uppercase tracking-widest text-sm"
              >
                Continue_to_Contact
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="block font-mono text-emerald-500 text-sm tracking-widest uppercase mb-2">
                [Step_02]: Comms_Channel
              </label>
              <input
                type="text"
                placeholder="EMAIL OR PHONE NUMBER..."
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-white font-mono focus:border-blue-500 focus:outline-none transition-all"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
              <div className="flex gap-4">
                <button type="button" onClick={prevStep} className="flex-1 py-4 bg-slate-800 text-slate-300 font-bold rounded-xl uppercase text-xs">Back</button>
                <button 
                    type="button" 
                    onClick={nextStep} 
                    disabled={!formData.contact.trim()}
                    className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-xl uppercase text-xs tracking-widest disabled:opacity-50"
                >
                    Authorize_Objectives
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <label className="block font-mono text-emerald-500 text-sm tracking-widest uppercase mb-2">
                [Step_03]: Mission_Parameters
              </label>
              <textarea
                rows="4"
                placeholder="DESCRIBE PROJECT OR TARGET TO TEST..."
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-white font-mono focus:border-blue-500 focus:outline-none transition-all resize-none"
                value={formData.objective}
                onChange={(e) => setFormData({...formData, objective: e.target.value})}
              />
              <div className="flex gap-4">
                <button type="button" onClick={prevStep} className="flex-1 py-4 bg-slate-800 text-slate-300 font-bold rounded-xl uppercase text-xs">Back</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !formData.objective.trim()}
                  className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] uppercase text-xs tracking-widest disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? "ENCRYPTING..." : "Execute_Deployment"}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="flex justify-center gap-3 mt-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 w-8 rounded-full transition-all duration-500 ${step === s ? "bg-blue-500 w-12" : "bg-slate-800"}`}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
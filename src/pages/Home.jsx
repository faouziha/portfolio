import React, { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import Skills from "../components/Skills";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import CertificateCard from "../components/CertificateCard";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Education from "../components/Education";
import Experience from "../components/Experience";

const Home = () => {
  const [profileData, setProfileData] = useState({ content: "", avatar: "" });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]); // State was here, but not updated
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 1 : prev));
      }, 30);

      try {
        const [heroRes, projectsRes, skillsRes, certsRes, eduRes, expRes] =
          await Promise.all([
            supabase.from("profile").select("content, avatar_url").single(),
            supabase.from("projects").select("*"),
            supabase
              .from("skills")
              .select("*")
              .order("proficiency_level", { ascending: false }),
            supabase
              .from("certificates")
              .select("*")
              .order("issue_date", { ascending: false }),
            // Fetch Education
            supabase
              .from("education")
              .select("*")
              .order("order_index", { ascending: true }),
            // Fetch Experience
            supabase
              .from("experience")
              .select("*")
              .order("order_index", { ascending: true }),
          ]);

        // 3. Update States
        if (heroRes.data) {
          setProfileData({
            content: heroRes.data.content,
            avatar: heroRes.data.avatar_url,
          });
        }
        if (projectsRes.data) setProjects(projectsRes.data);
        if (skillsRes.data) setSkills(skillsRes.data);
        if (certsRes.data) setCertificates(certsRes.data);

        // ADD THESE TWO LINES:
        if (eduRes.data) setEducation(eduRes.data);
        if (expRes.data) setExperience(expRes.data);

        setProgress(100);
        setTimeout(() => setLoading(false), 800);
      } catch (error) {
        console.error("Critical System Failure:", error);
      } finally {
        clearInterval(interval);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <LoadingScreen progress={progress} />;

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30 overflow-x-hidden">
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />

      {/* BACKGROUND LAYERS - Re-added for the terminal effect */}
      <div className="terminal-data-stream" />
      <div className="terminal-grid" />

      {/* Decorative Floating UI Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[12%] left-[2%] font-mono text-[9px] text-blue-500/20 space-y-1">
          <p>RECV: 0x88231... OK</p>
          <p>RECV: 0x99102... OK</p>
        </div>
        <div className="absolute bottom-[5%] left-[2%] font-mono text-[9px] text-slate-500/20">
          LATENCY: 24ms <br />
          UPTIME: 99.9%
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10">
        <div id="home">
          <Hero description={profileData.content} avatar={profileData.avatar} />
        </div>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">
              Exploited <span className="text-blue-500">_Projects</span>
            </h2>
            <div className="h-px bg-slate-800 flex-grow mt-2"></div>
          </div>

          {/* 2. Slice the projects array based on the state */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .slice(0, showAllProjects ? projects.length : 3)
              .map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
          </div>

          {/* 3. The Toggle Button */}
          {projects.length > 3 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="group relative px-8 py-3 bg-transparent border border-blue-500/50 hover:border-blue-500 text-blue-500 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-lg overflow-hidden"
              >
                <span className="relative z-10">
                  {showAllProjects
                    ? "CLOSE_DATABASE"
                    : "ACCESS_REMAINDING_LOGS"}
                </span>
                <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          )}
        </section>

        {/* Skills Section */}
        <div id="skills">
          <Skills skills={skills} />
        </div>

        {/* Education & Experience Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <Education education={education} />
            <Experience experience={experience} />
          </div>
        </section>

        {/* Certificates Section - REDUCED TOP PADDING */}
        {/* Certificates Section */}
        <section
          id="certificates"
          className="relative pt-12 pb-24 px-6 max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Verified <span className="text-emerald-500">_Clearances</span>
              </h2>
              <p className="font-mono text-[10px] text-blue-500/60 uppercase tracking-[0.4em]">
                Integrity: 100% | Origin: Official_Issuers
              </p>
            </div>
            <div className="hidden md:block h-px bg-gradient-to-r from-emerald-500/50 to-transparent flex-grow mt-4"></div>
          </div>

          {/* SLICED GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {certificates
              .slice(0, showAllCerts ? certificates.length : 4)
              .map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
          </div>

          {/* TOGGLE BUTTON FOR CERTIFICATES */}
          {certificates.length > 4 && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAllCerts(!showAllCerts)}
                className="group relative px-8 py-3 bg-transparent border border-emerald-500/50 hover:border-emerald-500 text-emerald-500 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 rounded-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {showAllCerts
                    ? "MINIMIZE_FILES"
                    : `DECRYPT_${certificates.length - 4}_MORE_CLEARANCES`}
                </span>
                <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          )}
        </section>
      </main>

      <Contact />

      <Footer />
    </div>
  );
};

export default Home;

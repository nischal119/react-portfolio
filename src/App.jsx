import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import SEO from "./components/SEO";
import { AnimatePresence } from "framer-motion";
import { db, collection } from "./firebase";
import { getDocs } from "firebase/firestore";

const LandingPage = ({ showWelcome, setShowWelcome, projects, certificates }) => {
  return (
    <>
      <SEO
        title="Nischal Dhungel - Full Stack Developer & Software Engineer"
        description="Experienced Full Stack Developer specializing in React, Node.js, and modern web technologies. Building innovative digital solutions and web applications with expertise in JavaScript, Python, and cloud technologies."
        keywords="Full Stack Developer, React Developer, Node.js, JavaScript, Python, Web Development, Software Engineer, Frontend Developer, Backend Developer, Portfolio, Nischal Dhungel"
      />
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About projects={projects} certificates={certificates} />
          <Portofolio projectsData={projects} certificatesData={certificates} />
          <ContactPage />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2024{" "}
                <a href="https://eki.my.id" className="hover:underline">
                  Nischal™
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <SEO
      title="Project Details - Nischal Dhungel Portfolio"
      description="Detailed view of my latest projects and development work. Explore the technologies, features, and implementation details of my portfolio projects."
      keywords="Project Details, Portfolio Projects, Web Development Projects, React Projects, Full Stack Projects, Nischal Dhungel"
    />
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://eki.my.id" className="hover:underline">
            Nischal™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());
      
      setProjects(projectData);
      setCertificates(certificateData);

      // Legacy support for other components still reading from localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
                projects={projects}
                certificates={certificates}
              />
            }
          />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

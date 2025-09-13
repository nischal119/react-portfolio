import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
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

const LandingPage = ({ showWelcome, setShowWelcome }) => {
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
          <About />
          <Portofolio />
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

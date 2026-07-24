import './App.css'
import Navbar from './components/Navbar'
import { portfolioData as d } from "./data/data"
import Main from './components/Main'
import Skills from './components/Skills'
import Experience from "./components/Experience"
import Project from './components/Project'
import EducationCert from './components/EducationCert'
import ContributionsCalendar from './components/Contributions'
import Footer from './components/Footer'
import LeetCodeStats from './components/LeetcodeContributions'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar links={d.links} contact={[d.phone, d.email]} />
      <main className="max-w-4xl min-h-screen px-4 mx-auto pt-2 lg:pt-16 pb-12">
        <Main name={d.name} tagline={d.tagline}/>
        <Skills skills={d.skills}/>
        <Experience experience={d.experience}/>
        <Project projects={d.projects} />
        <ContributionsCalendar username="ayushpatwal011" />
        <LeetCodeStats username="ayushpatwal" />
        <EducationCert education={d.education} certifications={d.certifications} />
        <Footer location={d.location} title={d.title}/>
      </main>
    </div>
  )
}

export default App

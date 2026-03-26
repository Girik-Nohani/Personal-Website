import { client } from "@/sanity/lib/client"
import {
  certificationsQuery,
  educationQuery,
  experienceQuery,
  navigationQuery,
  projectsQuery,
  seoDefaultsQuery,
  servicesQuery,
  siteSettingsQuery,
  skillCategoriesQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries"

// Layout
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

// Sections
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Education from "@/components/sections/Education"
import Certification from "@/components/sections/Certification"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import Testimonials from "@/components/sections/Testimonials"
import Services from "@/components/sections/Services"
import Experience from "@/components/sections/Experience"
import Contact from "@/components/sections/Contact"

export default async function Home() {
  const [
    projects,
    skillCategories,
    education,
    certifications,
    testimonials,
    services,
    experience,
    siteSettings,
    navigation,
    seoDefaults,
  ] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(skillCategoriesQuery),
    client.fetch(educationQuery),
    client.fetch(certificationsQuery),
    client.fetch(testimonialsQuery),
    client.fetch(servicesQuery),
    client.fetch(experienceQuery),
    client.fetch(siteSettingsQuery),
    client.fetch(navigationQuery),
    client.fetch(seoDefaultsQuery),
  ])

  return (
    <>
      {/* Navbar */}
      <Navbar navigation={navigation} siteSettings={siteSettings} />

      {/* Main Content */}
      <main>
        <Hero siteSettings={siteSettings} navigation={navigation} />

        <About siteSettings={siteSettings} />

        <Education education={education} />

        <Certification certifications={certifications} />

        <Skills skillCategories={skillCategories} />

        <Projects projects={projects} />

        <Testimonials testimonials={testimonials} />

        {services?.length > 0 && <Services services={services} />}

        {experience?.length > 0 && <Experience experience={experience} />}

        <Contact siteSettings={siteSettings} seoDefaults={seoDefaults} />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
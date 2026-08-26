import { Nav } from '@/components/layout/Nav'
import { MobileStatusBar } from '@/components/layout/MobileStatusBar'
import { Hero } from '@/components/sections/Hero'
import { DEFAULT_SECTION_HEADINGS } from '@/lib/section-headings-defaults'
import { About } from '@/components/sections/About'
import { Education } from '@/components/sections/Education'
import { Certifications } from '@/components/sections/Certifications'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Writeups } from '@/components/sections/Writeups'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'

import { client } from '@/lib/sanity/client'
import {
  SITE_SETTINGS_QUERY,
  SECTION_HEADINGS_QUERY,
  ABOUT_QUERY,
  EDUCATION_QUERY,
  CERTIFICATIONS_QUERY,
  EXPERIENCE_QUERY,
  SKILLS_QUERY,
  PROJECTS_QUERY,
  WRITEUPS_QUERY,
  TESTIMONIALS_QUERY,
  CONTACT_SETTINGS_QUERY,
} from '@/lib/sanity/queries'

import type {
  SiteSettings,
  SectionHeadings,
  AboutSection,
  EducationEntry,
  Certification,
  ExperienceEntry,
  SkillCategory,
  Project,
  Writeup,
  Testimonial,
  ContactSettings,
} from '@/types/content'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'writeups', label: 'Writeups' },
  { id: 'contact', label: 'Contact' },
]

export default async function Home() {
    const [siteSettings, about, education, certifications, experience, skills, projects, writeups, testimonials, contact, sectionHeadingsResult] =
    await Promise.all([
      client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
      client.fetch<AboutSection>(ABOUT_QUERY),
      client.fetch<EducationEntry[]>(EDUCATION_QUERY),
      client.fetch<Certification[]>(CERTIFICATIONS_QUERY),
      client.fetch<ExperienceEntry[]>(EXPERIENCE_QUERY),
      client.fetch<SkillCategory[]>(SKILLS_QUERY),
      client.fetch<Project[]>(PROJECTS_QUERY),
      client.fetch<Writeup[]>(WRITEUPS_QUERY),
      client.fetch<Testimonial[]>(TESTIMONIALS_QUERY),
      client.fetch<ContactSettings>(CONTACT_SETTINGS_QUERY),
      client.fetch<SectionHeadings>(SECTION_HEADINGS_QUERY),
    ])

  const sectionHeadings = sectionHeadingsResult ?? DEFAULT_SECTION_HEADINGS

  return (
    <>
      <Nav links={navLinks} />
      <MobileStatusBar socialLinks={siteSettings.socialLinks} availability={siteSettings.availability} />
      <main>

        <section id="home" className="py-0">
          <Hero {...siteSettings} />
        </section>

        <section id="about">
          <About {...about} socialLinks={siteSettings.socialLinks} resumeUrl={siteSettings.resumeFile} />
          <Education entries={education} heading={sectionHeadings.education} />
          <Certifications certifications={certifications} heading={sectionHeadings.certifications} />
          <Experience entries={experience} heading={sectionHeadings.experience} />
          <Skills categories={skills} heading={sectionHeadings.skills} />
        </section>

        <section id="projects">
          <Projects projects={projects} heading={sectionHeadings.projects} />
        </section>

        <section id="writeups">
          <Writeups writeups={writeups} heading={sectionHeadings.writeups} />
          <TestimonialsCarousel testimonials={testimonials} heading={sectionHeadings.testimonials} />
        </section>

        <section id="contact">
          <Contact contact={contact} socialLinks={siteSettings.socialLinks} />
        </section>

      </main>
      <Footer name={siteSettings.name} />
    </>
  )
}
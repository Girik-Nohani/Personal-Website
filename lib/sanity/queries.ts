// lib/sanity/queries.ts
//
// Every projection below resolves image assets down to a plain URL string
// (and slug fields down to a plain string) so the fetched shape matches
// types/content.ts exactly — components keep working unchanged, per the
// mock-data-first contract from the build plan (§4.11).

export const SITE_SETTINGS_QUERY = /* groq */ `
*[_type == "siteSettings"][0]{
  name,
  roles,
  tagline,
  primaryCta,
  secondaryCta,
  "resumeFile": resumeFile.asset->url,
  "heroVideo": heroVideo.asset->url,
  "heroVideoPoster": heroVideoPoster.asset->url,
  availability,
  socialLinks
}
`

export const SECTION_HEADINGS_QUERY = /* groq */ `
*[_type == "sectionHeadings"][0]{
  education,
  certifications,
  experience,
  skills,
  projects,
  writeups,
  testimonials
}
`

export const ABOUT_QUERY = /* groq */ `
*[_type == "aboutSection"][0]{
  heading,
  bioText,
  "image": image.asset->url,
  "imageAlt": image.alt
}
`

export const EDUCATION_QUERY = /* groq */ `
*[_type == "educationEntry"] | order(order asc){
  _id,
  degreeTitle,
  institution,
  institutionUrl,
  startYear,
  endYear,
  description,
  order
}
`

export const CERTIFICATIONS_QUERY = /* groq */ `
*[_type == "certification"] | order(order asc){
  _id,
  title,
  issuer,
  year,
  description,
  order
}
`

export const EXPERIENCE_QUERY = /* groq */ `
*[_type == "experienceEntry"] | order(order asc){
  _id,
  company,
  role,
  isCurrent,
  startYear,
  endYear,
  description,
  descriptionStyle,
  order
}
`

export const SKILLS_QUERY = /* groq */ `
*[_type == "skillCategory"] | order(order asc){
  "id": id.current,
  categoryName,
  description,
  skills,
  order
}
`

// Homepage grid — only projects flagged "Featured on homepage" in Studio.
export const PROJECTS_QUERY = /* groq */ `
*[_type == "project" && featured == true] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  category,
  shortDescription,
  techStack,
  date,
  liveLink,
  caseStudyBody,
  "gallery": gallery[]{"url": asset->url, alt},
  featured,
  order
}
`

export const WRITEUPS_QUERY = /* groq */ `
*[_type == "writeup"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  publishedDate,
  tags,
  order
}
`

// Powers generateStaticParams for the writeup page (/writeups/[slug])
export const WRITEUP_SLUGS_QUERY = /* groq */ `
*[_type == "writeup"]{ "slug": slug.current }
`

export const WRITEUP_BY_SLUG_QUERY = /* groq */ `
*[_type == "writeup" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedDate,
  excerpt,
  writeupBody[]{
    ...,
    _type == "image" => {
      ...,
      "imageUrl": asset->url,
      "imageWidth": asset->metadata.dimensions.width,
      "imageHeight": asset->metadata.dimensions.height
    }
  },
  order
}
`

export const TESTIMONIALS_QUERY = /* groq */ `
*[_type == "testimonial"] | order(order asc){
  _id,
  name,
  role,
  quote,
  "avatar": avatar.asset->url,
  order
}
`

export const CONTACT_SETTINGS_QUERY = /* groq */ `
*[_type == "contactSettings"][0]{
  eyebrow,
  heading,
  questionsHeading,
  questionsBody,
  privacyNote,
  connectEyebrow,
  connectHeading,
  recipientEmail,
  formSuccessMessage
}
`
// Powers generateStaticParams for the case study page (/projects/[slug])
export const PROJECT_SLUGS_QUERY = /* groq */ `
*[_type == "project"]{ "slug": slug.current }
`

export const PROJECT_BY_SLUG_QUERY = /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  category,
  shortDescription,
  techStack,
  date,
  liveLink,
  bodyHeading,
  caseStudyBody[]{
    ...,
    _type == "image" => {
      ...,
      "imageUrl": asset->url,
      "imageWidth": asset->metadata.dimensions.width,
      "imageHeight": asset->metadata.dimensions.height
    }
  },
  "gallery": gallery[]{"url": asset->url, alt},
  featured,
  order
}
`
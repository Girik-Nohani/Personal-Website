export const projectsQuery = `
  *[_type == "project"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    category,
    "coverImage": coverImage.asset->url,
    description,
    techStack,
    publishedAt,
    liveUrl,
    githubUrl
  }
`

export const skillCategoriesQuery = `
  *[_type == "skillCategory"] | order(order asc) {
    categoryName,
    icon,
    skills,
    order
  }
`

export const educationQuery = `
  *[_type == "education"] | order(order asc) {
    degree,
    institution,
    period,
    description,
    order
  }
`

export const certificationsQuery = `
  *[_type == "certification"] | order(order asc) {
    name,
    issuer,
    year,
    description,
    order
  }
`

export const testimonialsQuery = `
  *[_type == "testimonial"] | order(order asc) {
    quote,
    clientName,
    clientRole,
    "clientPhoto": clientPhoto.asset->url,
    order
  }
`

export const servicesQuery = `
  *[_type == "service" && isVisible == true] | order(order asc) {
    serviceName,
    description[],
    pricePerHour,
    icon,
    order
  }
`

export const experienceQuery = `
  *[_type == "experience" && isVisible == true] | order(order asc) {
    company,
    role,
    period,
    description,
    order
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    heroTagline,
    heroCta1Label,
    heroCta2Label,
    heroCta3Label,
    bio[],
    "profilePhoto": profilePhoto.asset->url,
    "cvFile": cvFile.asset->url,
    contactEmail,
    contactIntroText[],
    linkedinUrl,
    githubUrl,
    twitterUrl,
    projectsSectionIntro,
    testimonialsSectionIntro,
    certificationSectionIntro
  }
`

export const navigationQuery = `
  *[_type == "navigation"][0] {
    navLinks[]{
      label,
      href
    },
    navCtaLabel,
    logoText
  }
`

export const seoDefaultsQuery = `
  *[_type == "seoDefaults"][0] {
    defaultMetaTitle,
    defaultMetaDescription,
    "defaultOgImage": defaultOgImage.asset->url,
    twitterHandle
  }
`
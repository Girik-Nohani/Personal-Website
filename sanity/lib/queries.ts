import { client } from "./client";

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(publishedAt desc)`);
}

export async function getSkills() {
  return client.fetch(`*[_type == "skillCategory"] | order(order asc)`);
}

export async function getEducation() {
  return client.fetch(`*[_type == "education"] | order(order asc)`);
}

export async function getCertifications() {
  return client.fetch(`*[_type == "certification"] | order(order asc)`);
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"] | order(order asc)`);
}
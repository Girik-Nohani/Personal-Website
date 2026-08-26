// studio/structure.ts
import type { StructureResolver } from 'sanity/structure'

const SINGLETON_TYPES = new Set(['siteSettings', 'aboutSection', 'contactSettings', 'sectionHeadings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('About Section')
        .id('aboutSection')
        .child(S.document().schemaType('aboutSection').documentId('aboutSection')),
      S.listItem()
        .title('Contact Settings')
        .id('contactSettings')
        .child(S.document().schemaType('contactSettings').documentId('contactSettings')),
      S.listItem()
        .title('Section Headings')
        .id('sectionHeadings')
        .child(S.document().schemaType('sectionHeadings').documentId('sectionHeadings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string)
      ),
    ])
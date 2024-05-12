export function convertNameSlug(slug: string) {
  switch (slug) {
    case (slug = "monitors"):
      return "monitores";
    case (slug = "keyboards"):
      return "teclados";
    case (slug = "speakers"):
      return "caixas de som";
    case (slug = "headphones"):
      return "fones";
    case (slug = "mousepads"):
      return "mousepads";
    case (slug = "mouses"):
      return "mouses";
  }
}

export function mapDomainInverse(domainKey: string): string {
  const inverseDomainMap: Record<string, string> = {
    programming: "Programmation",
    graphics: "Infographie",
    ml: "Machine Learning",
    networking: "Réseaux et cloud",
    security: "Cryptographie et Sécurité",
    entrepreneurship: "Entreprenariat",
    marketing: "Marketing digital",
    "Machine Learning": "Machine Learning",
    "Programmation": "Programmation",
    "Infographie": "Infographie",
    "Réseaux et cloud": "Réseaux et cloud",
    "Cryptographie et Sécurité": "Cryptographie et Sécurité",
    "Entreprenariat": "Entreprenariat",
    "Marketing digital": "Marketing digital",
    "Autres": "Autres",
    other: "Autres",
  };

  return inverseDomainMap[domainKey] || "Autres";
}


export const AVAILABLE_DOMAINS = [
  { key: "programming", label: "Programmation" },
  { key: "graphics", label: "Infographie" },
  { key: "ml", label: "Machine Learning" },
  { key: "networking", label: "Réseaux et cloud" },
  { key: "security", label: "Cryptographie et Sécurité" },
  { key: "entrepreneurship", label: "Entreprenariat" },
  { key: "marketing", label: "Marketing digital" },
  { key: "other", label: "Autres" },
];

export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

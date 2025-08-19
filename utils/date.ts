export function formatDateFrench(dateStr?: string | null): string {
  if (!dateStr) return ""; // gère les valeurs null ou undefined

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ""; // gère les dates invalides

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

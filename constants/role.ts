
export const roleOrder: Record<string, number> = {
  "président d'honneur": 1,
  coordonateur: 2, 
  coordonnateur: 2, 
  "leader extrême nord": 3,
  "co-leader extrême nord": 4,
  "leader nord": 5,
  "co-leader nord": 6,
  "leader adamaoua": 7,
  "co-leader adamaoua": 8,
};

export const normalizeRole = (role: string): string => {
  return role
    .toLowerCase()
    .replace(/-/g, "") 
    .replace(/\s+/g, " ") 
    .trim();
};

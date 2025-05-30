import React from "react";

interface TableOfContentProps {
  items: any[];
  activeItemId: string;
  onItemClick: (event: React.MouseEvent, id: string) => void;
}

const TableOfContent = ({
  items,
  activeItemId,
  onItemClick,
}: TableOfContentProps) => {
  return (
    <>
      <div className="text-lg mb-2 font-bold">Table de matière</div>
      <ul className="">
        {items.length === 0 && (
          <li className="text-sm block h-full py-1.5 font-medium">
            Aucun contenu
          </li>
        )}
        {items.map((item) => (
          <li key={item.id} className="">
            <a
              href={`#${item.id}`}
              className={`text-sm block h-full py-1.5 font-medium ${activeItemId === item.id ? "font-bold text-blue-600" : ""}`}
              onClick={(e) => onItemClick(e, item.id)}
              style={{
                paddingLeft: (item.level - 2) * 16,
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfContent;

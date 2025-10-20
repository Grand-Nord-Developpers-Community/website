import * as React from "react";

import { cn } from "@/lib/utils";

export interface IRGBColor {r: number, g: number, b: number}

export const tagsColors: { [key: string]: IRGBColor } = {
  "angular": {r: 221, g: 0, b: 49}, 
  "angular.js": {r: 221, g: 0, b: 49}, 
  "flutter": {r: 27, g: 188, b: 231}, 
  "react native": {r: 27, g: 188, b: 231}, 
  "react": {r: 27, g: 188, b: 231}, 
  "react.js": {r: 27, g: 188, b: 231}, 
  "react js": {r: 27, g: 188, b: 231}, 
  "vue": {r: 65, g: 184, b: 131}, 
  "vue js": {r: 65, g: 184, b: 131}, 
  "vue.js": {r: 65, g: 184, b: 131}, 
  "javascript": {r: 247, g: 223, b: 30},
  "python": {r: 75, g: 139, b: 190},
  "java": {r: 0, g: 121, b: 150},
  "c++": {r: 3, g: 89, b: 156},
  "c#": {r: 163, g: 42, b: 165},
  "ruby": {r: 231, g: 32, b: 42},
  "php": {r: 92, g: 122, b: 173},
  "swift": {r: 240, g: 81, b: 45},
  "kotlin": {r: 155, g: 89, b: 182},
  "go": {r: 29, g: 185, b: 240},
  "rust": {r: 222, g: 53, b: 38},
  "typescript": {r: 0, g: 122, b: 204},
  "sql": {r: 79, g: 84, b: 92},
  "html": {r: 228, g: 78, b: 39},
  "css": {r: 38, g: 77, b: 22},
  "node.js": {r: 114, g: 157, b: 66},
  "git": {r: 240, g: 81, b: 53},
  "docker": {r: 0, g: 129, b: 198},
  "kubernetes": {r: 59, g: 133, b: 215},
  "aws": {r: 255, g: 158, b: 0},
  "azure": {r: 0, g: 122, b: 204},
  "google cloud": {r: 66, g: 133, b: 244},
  "firebase": {r: 255, g: 102, b: 0},
  "mongodb": {r: 34, g: 139, b: 69},
  "postgresql": {r: 49, g: 114, b: 156},
  "mysql": {r: 147, g: 186, b: 228},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
  // "tag": {65,184,251},
}

export interface ChipsInputProps {
  value: string;
  className: string;
  onChange: any;
  onBlur?: any;
  disabled?: boolean;
}

const ChipsInput = React.forwardRef<HTMLTextAreaElement, ChipsInputProps>(
  ({className, ...props}, ref) => {

    const [tags, setTags] = React.useState<string[]>(props.value?.split(',') || [])

    const emitChanges = (values: string[]) => {
      props.onChange(values.join(','))
    }

    const handleKeyDown = async (e: any) => {
      if (props.disabled) return
      if (e.key === "," || e.key === "Enter") {
        e.preventDefault()  
        let tag = e.target.value.trim()
        if (!tags.includes(tag) && tag != '') {
          let newList = [...tags, tag]
          await setTags(newList)
          emitChanges(newList);
          e.target.value = ''
        }
      }
    }

    const handleDelete = async (str: string) => {
      if (props.disabled) return
      const newList = tags.filter((tag) => tag != str)
      await setTags(newList)
      emitChanges(newList);
    }

    return (
      <div className={cn("w-full max-w-md mx-auto", props.disabled ? " opacity-50" : "")}>
        <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md bg-white">
          {tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center h-[25px] px-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-[6px]">
              {tag}
              <button
                className="ml-2 text-red-500 text-[20px] hover:text-red-700" 
                type="button"
                onClick={() => handleDelete(tag)}
                aria-label={`Supprimer ${tag}`}
              >
                &times;
              </button>
            </span>
          ))}
          <input
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Ajouter un tag..."
            className="flex-grow p-1 outline-none border-none bg-transparent"
          />
        </div>
      </div>
    )
  }
)

ChipsInput.displayName = "ChipsInput"

export interface ChipsTagProps extends React.DOMAttributes<HTMLSpanElement> {
  className?: string;
  tag: string;
  handleClick?: any
  style?: {[key: string]: string | number};
}

const ChipsTag = (({className, tag, ...props}: ChipsTagProps) => {
  let tagColor: IRGBColor | null = tagsColors[tag.trim().toLocaleLowerCase()]

  return (
    <span
      {...props}
      style={Object.assign({}, (tagColor ? {
        color: `rgb(${tagColor.r}, ${tagColor.g}, ${tagColor.b})`,
        backgroundColor: `rgba(${tagColor.r}, ${tagColor.g}, ${tagColor.b}, .2)`
      } : {}), props.style)}
      className={cn(
        "inline-flex items-center h-[25px] px-2 text-sm font-medium rounded-[6px] flex-shrink-0",
        tagColor ? "" : "text-gray-800 border border-gray-200",
        className
      )}
    >
      {tag}
    </span>
  )
})

// ChipsTag.displayName = "ChipsTag"

export { ChipsInput, ChipsTag }
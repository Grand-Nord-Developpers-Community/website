import IconCloud from "@/components/ui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  //"cypress",
  "docker",
  "git",
  //"jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  //"sonarqube",
  "figma",
];

export default function IconCloudDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden px-20 pb-20 pt-8 max-sm:px-[1rem]  max-sm:pb-[4.5rem]">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

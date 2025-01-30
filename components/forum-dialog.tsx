// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import ForumPost from "@/components/forum-post-component";
// export default function ForumDialog() {
//   const [open, setOpen] = useState(false);
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>Nouveau forum</Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Poser votre question</DialogTitle>
//           <DialogDescription>
//             Remplir les informations ci-dessous pour poser votre question
//           </DialogDescription>
//         </DialogHeader>
//         <div className="w-full">
//           <ForumPost
//             onSucessCallBack={() => {
//               setOpen(false);
//             }}
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
"use client";

import React, { useState } from "react";
import Dialog from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import ForumPost from "@/components/forum-post-component";

export default function ForumDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Nouveau forum</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold">Poser votre question</h2>
        <p className="text-gray-500 mb-4">
          Remplir les informations ci-dessous pour poser votre question.
        </p>
        <ForumPost
          onSucessCallBack={() => {
            setOpen(false);
          }}
        />
      </Dialog>
    </>
  );
}

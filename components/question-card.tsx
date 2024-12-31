import Link from "next/link"
import {  Eye, MessageSquare } from 'lucide-react'
import { Card } from "@/components/ui/card"
import {getForumPosts} from "@/actions/forum.actions"
import EmptyQuestionIcon from "@/assets/svgs/undraw_opinion_re_jix4.svg"
import VoidQuestionIcon from "@/assets/svgs/undraw_void_-3-ggu.svg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditorRender } from "@/components/minimal-tiptap";
import {formatRelativeTime} from "@/lib/utils"
export default async function QuestionCard() {
  let questions=undefined
  try{
   questions=await getForumPosts()
  }catch(e){
    console.log(e)
  }
  return (
    <>
      {questions&&questions.length===0&&<>
      <EmptyQuestionIcon className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
      <h2 className="text-2xl mx-auto text-center font-medium my-3 text-gray-400">
        Pas de questions posées pour l&apos;instant !
      </h2>
      </>}
      {questions&&questions.map((q,i)=>(
          <Card className="p-4 overflow-hidden" key={i}>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage
                    src={q.author.image || ""}
                    alt="Author avatar"
                  />
                  <AvatarFallback>
                    {q.author?.name?.slice(0, 2)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Link href={`/forum/${q.id}`} className="block">
 		   <h2 className="text-lg font-semibold hover:text-secondary">{q.title}</h2>
 		  </Link>
                  <div className="flex flex-col">
                    <EditorRender 
                      throttleDelay={0}
                      className={"h-full pb-5 min-h-10 w-full rounded-xl"}
                      editorContentClassName="overflow-auto h-full flex grow"
                      output="html"
                      placeholder="Saisir votre question ..."
                      editable={false}
                      value={q.content}
                      editorClassName="focus:outline-none h-full grow"
                    />
<div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
           0 <span className="max-sm:hidden">Réponse</span>
         </div>
       <div className="flex items-center gap-1">
  <Eye className="h-4 w-4" />
 0 <span className="max-sm:hidden">Vue</span>
  </div>
                    <span className="text-sm text-muted-foreground">Posé par {q.author?.name}&ensp;&ensp;{formatRelativeTime(new Date(q.createdAt))}</span>
</div>
                  </div>
                </div>
              </div>
            </Card>
        ))}
      {!questions&&<>
      <VoidQuestionIcon className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
      <h2 className="text-2xl mx-auto text-center font-medium my-3 text-gray-400">
        Erreur chargement question
      </h2>
      </>}
    </>
    // <Card className="p-4">
    //   <div className="flex gap-4">
    //     <Link href={`/users/${author.name}`}>
    //       <Image
    //         src={author.avatar}
    //         alt={author.name}
    //         width={40}
    //         height={40}
    //         className="rounded-full"
    //       />
    //     </Link>
    //     <div className="flex-1 space-y-2">
    //       <Link href={`/questions/${id}`} className="block">
    //         <h2 className="text-lg font-semibold hover:text-blue-600">{title}</h2>
    //       </Link>
    //       {image && (
    //         <Image
    //           src={image}
    //           alt="Question image"
    //           width={200}
    //           height={150}
    //           className="rounded-md"
    //         />
    //       )}
    //       <div className="flex flex-wrap gap-2">
    //         {tags.map((tag) => (
    //           <Badge key={tag} variant="secondary" className="bg-blue-50">
    //             {tag}
    //           </Badge>
    //         ))}
    //       </div>
    //       <div className="flex items-center gap-4 text-sm text-muted-foreground">
    //         <div className="flex items-center gap-1">
    //           <ArrowBigUp className="h-5 w-5 text-green-500 cursor-pointer" />
    //           <span>{stats.upvotes}</span>
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <ArrowBigDown className="h-5 w-5 text-red-500 cursor-pointer" />
    //           <span>{stats.downvotes}</span>
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <MessageSquare className="h-4 w-4" />
    //           {stats.answers} Answers
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Eye className="h-4 w-4" />
    //           {stats.views} Views
    //         </div>
    //         <span className="ml-auto">Asked {timeAgo}</span>
    //       </div>
    //     </div>
    //   </div>
    // </Card>
  )
}


"use client";
import confetti from "canvas-confetti";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { updateUserCheckProfile } from "@/actions/user.actions";
import { useSWRConfig } from "swr";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import ForumDialog from "@/components/forum-dialog";
import PostCard from "@/components/post-card";
import { toast } from "sonner";
import { useConfirm } from "@omit/react-confirm-dialog";
import { deleteBlog, getUserBlogPosts } from "@/actions/blog.actions";
import { deleteForum, getUserForumPosts } from "@/actions/forum.actions";
import ForumEmptyImage from "@/assets/svgs/undraw_begin_chat_re_v0lw.svg";
import BlogEmptyImage from "@/assets/svgs/undraw_add_notes_re_ln36.svg";
import { AlertModal } from "@/components/modal/alert-modal";
import { useRouter } from "next/navigation";
import EditForumPost from "@/components/editForumPost";
import { Forum } from "@/components/question-card";
import TestWorkerPage from "@/components/test-trigger";
export type ForumUser = Awaited<ReturnType<typeof getUserForumPosts>>;
export type BlogUser = Awaited<ReturnType<typeof getUserBlogPosts>>;

const Dashboard = ({
  userId,
  isUserCheckProfile,
  posts,
  forums,
  viewCountForums,
  viewCountPosts,
}: {
  userId: string;
  isUserCheckProfile: boolean;
  posts: BlogUser;
  forums: ForumUser;
  viewCountForums: Record<string, number>;
  viewCountPosts: Record<string, number>;
}) => {
  const { mutate } = useSWRConfig();
  const confirm = useConfirm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<{
    id: string;
    title: string;
    content: string;
  }>();
  const [openEditForum, setOpenEditForum] = useState(false);
  useEffect(() => {
    confirm.updateConfig((prev) => ({
      ...prev,
      confirmButton: { ...prev.confirmButton, disabled: isLoading },
      cancelButton: { ...prev.cancelButton, disabled: isLoading },
    }));
  }, [isLoading]);
  const [activeTab, setActiveTab] = useState<"blogs" | "forums">("blogs");
  const [actionId, setActionId] = useState<{ id: string; action: string }>({
    id: "",
    action: "",
  });

  //const [blogs, setBlogs] = useState<Post[]>([])
  //const [forums, setForums] = useState<Post[]>([])

  //const [isCountLoading, setIsCountLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [isFirstTimeToDashboard] = useState<boolean>(isUserCheckProfile);

  const handleEdit = (id: string) => {
    const f = forums?.filter((f) => f.id === id)[0];
    setPost(f);
    setOpenEditForum(true);
    //toast.message("Edition n'est pas implémenter pour le moment");
    //console.log(`Editing ${activeTab} post with id: ${id}`);
  };
  const handleBlogEdit = (id: string) => {
    const slug = posts.filter((p) => p.id === id)[0].slug;
    router.push("/blog/" + slug + "/edit");
    //toast.message("Edition n'est pas implémenter pour le moment");
    //console.log(`Editing ${activeTab} post with id: ${id}`);
  };
  const handleAction = async () => {
    if (actionId.id === "" || actionId.action === "") return;
    const { id, action } = actionId;
    if (action === "delete_blog") {
      await handleDeleteBlog(id);
    } else if (action === "delete_forum") {
      await handleDeleteForum(id);
    }
  };
  const handleDeleteForum = async (id: string) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = await deleteForum(id);
        if (res.sucess) {
          //onConfirm();
          toast.success(res.message);
        }
      } catch (e) {
        //onCancel();
        toast("Error : " + e);
      } finally {
        setIsLoading(false);
        setOpenModal(false);
      }
    } else {
      toast("Opération de suppression en cours d'execution");
    }
  };
  const handleDeleteBlog = async (id: string) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = await deleteBlog(id);
        if (res.sucess) {
          mutate("/api/blogs", true);
          //onConfirm();
          toast.success(res.message);
        }
      } catch (e) {
        //onCancel();
        toast("Error : " + e);
      } finally {
        setIsLoading(false);
        setOpenModal(false);
      }
    } else {
      toast("Opération de suppression en cours d'execution");
    }
  };

  const fireshoot = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useLayoutEffect(() => {
    if (!isFirstTimeToDashboard) {
      setTimeout(() => {
        fireshoot();
      }, 3000);

      setTimeout(async () => {
        try {
          {
            ("use server");
            const res = await updateUserCheckProfile(userId);
          }
          mutate("/api/user/profile", true);
        } catch (e) {
          console.log(e);
        }
      }, 5000);
    }
  }, []);

  return (
    <>
      {/* LOCAL STORAGE : {JSON.stringify(pending)} */}
      <Tabs
        defaultValue="blogs"
        className="w-full "
        onValueChange={(value) => setActiveTab(value as "blogs" | "forums")}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="blogs" className="relative">
              Blogs
              <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {posts.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="forums" className="relative">
              Forums
              <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {forums?.length}
              </span>
            </TabsTrigger>
          </TabsList>
          {activeTab === "blogs" ? (
            <div className="max-sm:hidden">
              <Button asChild>
                <Link href="/blog/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Crée un blog
                </Link>
              </Button>
            </div>
          ) : (
            <div className="max-sm:hidden">
              <ForumDialog />
            </div>
          )}
        </div>
        <div className="mb-8">
          {/* <TestWorkerPage /> */}
          <TabsContent value="blogs">
            {posts.length > 0 ? (
              <>
                <div className="sm:hidden mb-4 w-full justify-end flex">
                  <Button asChild>
                    <Link href="/blog/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Crée un blog
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((blog) => (
                    <PostCard
                      key={blog.id}
                      type={"blog"}
                      slug={blog.slug}
                      date={blog.createdAt}
                      title={blog.title}
                      content={blog.description}
                      id={blog.id}
                      isDraft={blog.isDraft!}
                      onEdit={handleBlogEdit}
                      onDelete={(id) => {
                        setActionId({ id, action: "delete_blog" });
                        setOpenModal(true);
                      }}
                      views={viewCountPosts[blog?.slug!]}
                      replies={blog?.replies?.length}
                      likes={
                        blog?.likes!.filter((l) => l.isLike === true).length
                      }
                      rawContent={blog?.content!}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col h-[300px] justify-center items-center my-5">
                  <BlogEmptyImage className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
                  <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
                    Vous n&apos;avez pas posté un blog pour l&apos;instant !
                  </h2>
                </div>
                <div className="sm:hidden  w-full justify-center flex">
                  <Button asChild>
                    <Link href="/blog/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Crée un blog
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          <TabsContent value="forums">
            {forums?.length! > 0 ? (
              <>
                <div className="sm:hidden mb-4 w-full justify-end flex">
                  <ForumDialog />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {forums?.map((forum) => (
                    <PostCard
                      id={forum?.id!}
                      type={"forum"}
                      key={forum?.id!}
                      date={forum?.createdAt!}
                      title={forum?.title!}
                      content={forum?.textContent}
                      onEdit={handleEdit}
                      views={viewCountForums[forum?.id!]}
                      replies={forum?.replies?.length}
                      likes={forum?.votes?.filter((v) => v.isUpvote).length}
                      onDelete={(id) => {
                        setActionId({ id, action: "delete_forum" });
                        setOpenModal(true);
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col h-[300px] justify-center items-center my-5">
                  <ForumEmptyImage className="mx-auto lg:w-1/3 h-auto  max-md:w-1/2" />
                  <h2 className="text-xl max-sm:text-base mx-auto text-center font-medium my-3 text-gray-400">
                    Vous n&apos;avez pas posté une question pour l&apos;instant
                    !
                  </h2>
                </div>
                <div className="sm:hidden  w-full justify-center flex">
                  <ForumDialog />
                </div>
              </>
            )}
          </TabsContent>
        </div>
      </Tabs>
      <AlertModal
        onConfirm={handleAction}
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
        loading={isLoading}
      />
      <EditForumPost
        post={post!}
        isOpen={openEditForum}
        onSuccess={() => setOpenEditForum(false)}
        onClose={() => setOpenEditForum(false)}
      />
    </>
  );
};

export default Dashboard;

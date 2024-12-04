"use client";
import { useUserProfile } from "@/hooks/use-hook";
import confetti from "canvas-confetti";
import React, { useEffect,useState, useLayoutEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserProfileCompletionState } from "@/actions/user.actions";
import HeadingPage from "@/sections/common/HeadingPage";
import { useSWRConfig } from "swr";
import { BookOpen, MessageSquare, Activity, Award } from "lucide-react";
import StatWidget,{Stat} from "@/components/stat-widget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PlusCircle} from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import PostCard from "@/components/post-card"

interface Post {
  id: string
  title: string
  content: string
  date: string
}
interface CategoryProps {
  title: string;
  value: number;

  isSelected: boolean;
  onClick: () => void;
}

const Category: React.FC<CategoryProps> = ({
  title,
  value,
  isSelected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left py-2 px-4 rounded flex justify-between items-center ${
      isSelected
        ? "bg-[#F6EAD7] text-[#C38D3D] font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <span>{title}</span>
    <span className="font-semibold">{value}</span>
  </button>
);

enum widgetType {BLOG,FORUM,ACTIVITY,EXPERIENCE}
const Dashboard: React.FC = () => {
  const { user,isLoading:isProfileLoading } = useUserProfile();
  const { mutate } = useSWRConfig();

  const statItems: Stat[] = [
    { title: "Total Blogs", value:  0, icon: <BookOpen className="h-6 w-6" />, color: "from-blue-500 to-blue-600" },
    { title: "Total Forums", value:  0, icon: <MessageSquare className="h-6 w-6" />, color: "from-green-500 to-green-600" },
    { title: "Activitées", value:  user?.streak||0, icon: <Activity className="h-6 w-6" />, unit: "jour", color: "from-yellow-500 to-yellow-600" },
    { title: "Total Experiences", value:  user?.experiencePoints||0, icon: <Award className="h-6 w-6" />, unit: "XP", color: "from-purple-500 to-purple-600" },
  ]

  const [activeTab, setActiveTab] = useState<'blogs' | 'forums'>('blogs')
  const [blogs, setBlogs] = useState<Post[]>([])
  const [forums, setForums] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCountLoading, setIsCountLoading] = useState(true)
  const [isFirstTimeToDashboard,]=useState<boolean>(user?.isCompletedProfile!)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsCountLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setBlogs([
        { id: '1', title: 'My First Blog Post', content: 'This is the content of my first blog post.', date: '2023-05-15' },
        { id: '2', title: 'Another Blog Post', content: 'Here\'s another interesting blog post.', date: '2023-05-20' },
      ])
      setForums([
        { id: '1', title: 'Welcome to the Forum', content: 'Introduce yourself here!', date: '2023-05-10' },
        { id: '2', title: 'Tech Discussion', content: 'What\'s your favorite programming language?', date: '2023-05-18' },
      ])
      setIsLoading(false)
      await new Promise(resolve => setTimeout(resolve, 500)) // Additional delay for count to simulate separate API call
      setIsCountLoading(false)
    }
    fetchData()
  }, [])

  useEffect(()=>{
    statItems[widgetType.ACTIVITY].value=user?.streak!
    statItems[widgetType.EXPERIENCE].value=user?.experiencePoints!
  },[user])

  const handleCreate = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: `New ${activeTab === 'blogs' ? 'Blog Post' : 'Forum Thread'}`,
      content: `This is a new ${activeTab === 'blogs' ? 'blog post' : 'forum thread'}.`,
      date: new Date().toISOString().split('T')[0],
    }
    if (activeTab === 'blogs') {
      setBlogs([newPost, ...blogs])
    } else {
      setForums([newPost, ...forums])
    }
  }

  const handleEdit = (id: string) => {
    // Implement edit functionality here
    console.log(`Editing ${activeTab} post with id: ${id}`)
  }

  const handleDelete = (id: string) => {
    if (activeTab === 'blogs') {
      setBlogs(blogs.filter(blog => blog.id !== id))
    } else {
      setForums(forums.filter(forum => forum.id !== id))
    }
  }
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
        setTimeout(()=>{
          fireshoot();
        },1000)
        
        setTimeout(async () => {
          try {
            {
              "use server"
              const res = await updateUserProfileCompletionState(user?.id!);
            }
            mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`);
          } catch (e) {
            console.log(e);
          }
        }, 1500);
      }
  }, []);
  return (
    <>
      <HeadingPage
        title="Bienvenue à vous ,"
        subtitle={user?.name!}
        subClassName={"max-sm:block"}
        descClassName={"mb-5"}
        description={"Voici une vue d'ensemble de vos dernières activités"}
        icon={
          <Avatar className="h-11 w-11">
            <AvatarImage src={user?.image || ""} alt="@shadcn" />
            <AvatarFallback className="uppercase">
              {user?.name!.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        }
      />
      <div className="screen-wrapper mt-5">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatWidget item={statItems[widgetType.BLOG]} isLoading={true} />
            <StatWidget item={statItems[widgetType.FORUM]} isLoading={true} />
            <StatWidget item={statItems[widgetType.ACTIVITY]} isLoading={isProfileLoading} />
            <StatWidget item={statItems[widgetType.EXPERIENCE]} isLoading={isProfileLoading} />
        </div>
        <Tabs defaultValue="blogs" className="w-full " onValueChange={(value) => setActiveTab(value as 'blogs' | 'forums')}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="blogs" className="relative">
              Blogs
              {isCountLoading ? (
                <Skeleton className="ml-2 h-5 w-5 rounded-full" />
              ) : (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {blogs.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="forums" className="relative">
              Forums
              {isCountLoading ? (
                <Skeleton className="ml-2 h-5 w-5 rounded-full" />
              ) : (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {forums.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create {activeTab === 'blogs' ? 'Blog' : 'Forum'}
          </Button>
        </div>
        <div className="mb-8"><TabsContent value="blogs">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map(blog => (
                <PostCard key={blog.id} post={blog} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="forums">
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {forums.map(forum => (
                <PostCard key={forum.id} post={forum} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </TabsContent></div>
        
      </Tabs>
      </div>
      
    </>
  );
};

export default Dashboard;

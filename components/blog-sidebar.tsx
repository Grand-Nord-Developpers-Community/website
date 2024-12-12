"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { User2, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/image-upload";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/images/brand/logo.png";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useFormContext } from "@/providers/BlogFormContext";

interface CustomInputProps {
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  };
}

const CustomImageInput: React.FC<CustomInputProps> = ({ field }) => {
  const handleImageChange = (src: string) => {
    field.onChange(src);
  };

  return (
    <FormControl>
      <div className="w-full h-[200px]">
        <ImageUpload onUploadComplete={handleImageChange} />
      </div>
    </FormControl>
  );
};

export function AppSidebar() {
  const { form } = useFormContext();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Image loading="lazy" src={Logo} alt="logo GNDC" width={120} />
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>information blog</SidebarGroupLabel>
          <SidebarGroupContent className="gap-3 flex flex-col">
            <FormField
              name="preview"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <CustomImageInput field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*<SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>*/}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Titre de votre blog"
                      //disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Saisissez la description du blog"
                      className="bg-white"
                      //disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full mt-3 text-white"
              variant="secondary"
              type="submit"
            >
              Publier
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

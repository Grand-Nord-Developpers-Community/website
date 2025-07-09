"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AvatarUpload from "@/components/AvatarUpload"; // from Origin UI comp-125
import SkillsInput from "@/components/SkillsInput"; // from Origin UI comp-57
import UsernameInput from "@/components/UsernameInput"; // from Origin UI comp-14

import { Twitter, Github, Linkedin } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(3),
  bio: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
  websiteLink: z.string().url().optional(),
  githubLink: z.string().url().optional(),
  twitterLink: z.string().url().optional(),
  linkedinLink: z.string().url().optional(),
  skills: z.array(z.string()).optional(),
});

export default function ProfilePage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
      name: "",
      email: "",
      location: "",
      phoneNumber: "",
      websiteLink: "",
      githubLink: "",
      twitterLink: "",
      linkedinLink: "",
      skills: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitted profile data", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Avatar */}
        <div>
          <FormLabel>Photo de profil</FormLabel>
          <AvatarUpload
            onChange={(file) => {
              //field.onChange(file);
            }}
          />
        </div>

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pseudo</FormLabel>
              <UsernameInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <Textarea
                placeholder="Écrivez quelques phrases sur vous."
                className="min-h-[100px]"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localisation</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="twitterLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <div className="flex items-center">
                <Twitter className="mr-2 text-muted-foreground w-5 h-5" />
                <FormControl>
                  <Input placeholder="https://twitter.com/" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <div className="flex items-center">
                <Github className="mr-2 text-muted-foreground w-5 h-5" />
                <FormControl>
                  <Input placeholder="https://github.com/" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <div className="flex items-center">
                <Linkedin className="mr-2 text-muted-foreground w-5 h-5" />
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Web</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compétences</FormLabel>
              <SkillsInput
                value={field.value || []}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
}

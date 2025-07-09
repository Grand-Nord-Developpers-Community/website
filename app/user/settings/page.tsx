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
  image: z.string().url(),
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
      image: "",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-5">
        <div>
          <h2 className="text-xl font-semibold mb-2">Profil</h2>
          <p className="text-gray-600 mb-4">
            Vous trouverez ci-dessous les informations de votre profil pour
            votre compte.
          </p>
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <UsernameInput {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo de profil</FormLabel>
              <AvatarUpload />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Web ou portfolio</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Informations personnelles
          </h2>
          <p className="text-gray-600 mb-4">
            Mettez à jour vos informations personnelles. Votre adresse ne sera
            jamais accessible au public.
          </p>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} placeholder="votre nom" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} placeholder="email@gmail.com" />
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
                <Input {...field} placeholder="votre localisation" />
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
                <Input
                  type="tel"
                  {...field}
                  placeholder="votre numéro de téléphone"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h2 className="text-xl font-semibold mb-2">Réseaux sociaux</h2>
          <p className="text-gray-600 mb-4">
            Faites savoir à tout le monde où ils peuvent vous trouver.
          </p>
        </div>
        <FormField
          control={form.control}
          name="twitterLink"
          render={({ field }) => (
            <FormItem>
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
        <div>
          <h2 className="text-xl font-semibold mb-2">Vos compétences</h2>
          <p className="text-gray-600 ">
            Listez vos compétences. Votre compétence sera accessible au public.
          </p>
          <p className="text-green-400">
            vous pouvez utiliser la virgule pour ajouter d&apos;autre
          </p>
        </div>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
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

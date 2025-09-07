"use client";
import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Code,
  Camera,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Users,
  Network,
  Briefcase,
  Trophy,
  Heart,
  X,
} from "lucide-react";
import { createMemberAction } from "@/actions/members.action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import HeadingPage from "@/sections/common/HeadingPage";

const regions = [
  "Adamaoua",
  "Centre",
  "Est",
  "Extrême-Nord",
  "Littoral",
  "Nord",
  "Nord-Ouest",
  "Ouest",
  "Sud",
  "Sud-Ouest",
];

const domains = [
  "Programmation",
  "Machine Learning",
  "Infographie",
  "Entreprenariat",
  "Réseaux et cloud",
  "Cryptographie et Sécurité",
  "Marketing digital",
  "Autres",
];

const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Dart",
  "HTML/CSS",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Django",
  "Laravel",
];

// Toast Component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => (
  <div
    className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === "success"
        ? "bg-green-50 border border-green-200 text-green-800"
        : "bg-red-50 border border-red-200 text-red-800"
    }`}
  >
    <div className="flex items-start">
      {type === "success" ? (
        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
      )}
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className={`ml-3 inline-flex rounded-md p-1.5 hover:bg-opacity-20 focus:outline-none ${
          type === "success" ? "hover:bg-green-600" : "hover:bg-red-600"
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const BeMemberPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    fullName: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: "",
    region: "",
    domain: "",
    photoUrl: "",
    bio: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    website: "",
    facebook: "",
    languages: [] as string[],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const imageData = await response.json();
        setUploadedImage(imageData.url);
        handleInputChange("photoUrl", imageData.url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setToast({
        type: "error",
        message: "Erreur lors du téléchargement de l'image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.region ||
      !formData.domain ||
      !formData.photoUrl ||
      !formData.bio
    ) {
      setToast({
        type: "error",
        message: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "languages") {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value as string);
      }
    });

    startTransition(async () => {
      try {
        const result = await createMemberAction(form);

        if (result.success) {
          setToast({ type: "success", message: result.message });
          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            region: "",
            domain: "",
            photoUrl: "",
            bio: "",
            linkedin: "",
            github: "",
            twitter: "",
            instagram: "",
            website: "",
            facebook: "",
            languages: [],
          });
          setUploadedImage("");
        } else {
          setToast({ type: "error", message: result.message });
        }
      } catch (error) {
        setToast({
          type: "error",
          message: "Une erreur est survenue lors de l'inscription",
        });
      }
    });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen bg-slate-50">
        <HeadingPage
          title="Rejoindre la communauté"
          description=" Devenez membre officiel de notre réseau d'innovateurs passionnés de technologie dans le Grand Nord Cameroun"
          icon={<Users className="w-12 h-12 text-secondary" strokeWidth={3} />}
        />
        {/* Hero Section */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center">
              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Heart className="w-6 h-6 text-blue-600 mt-1" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Membre communautaire vs Compte utilisateur
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed mb-4">
                      Avoir un compte sur notre site web vous permet de naviguer
                      et consulter du contenu.
                      <strong>
                        {" "}
                        Devenir membre de la communauté GNDC
                      </strong>{" "}
                      vous donne accès à bien plus :
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start space-x-2">
                        <Network className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Réseau exclusif de professionnels tech</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Briefcase className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Opportunités de collaboration sur projets</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Trophy className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Participation à des événements exclusifs</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Mentorat et accompagnement technique</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-white rounded-t-lg border-b border-slate-100">
              <CardTitle className="text-2xl text-center text-slate-900">
                Formulaire de candidature
              </CardTitle>
              <p className="text-center text-slate-600 text-sm mt-2">
                Remplissez ce formulaire pour postuler en tant que membre
                officiel
              </p>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Photo Profile Section */}
                <div className="text-center">
                  <Label className="text-lg font-semibold text-slate-900 block mb-6">
                    Photo de profil <span className="text-red-500">*</span>
                  </Label>

                  <div className="flex flex-col items-center space-y-6">
                    {uploadedImage ? (
                      <div className="relative group">
                        <img
                          src={uploadedImage}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-3 border-blue-200 hover:bg-blue-50"
                          onClick={() =>
                            document.getElementById("photo-upload")?.click()
                          }
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Changer la photo
                        </Button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
                        <User className="w-12 h-12 text-slate-400" />
                      </div>
                    )}

                    <div className="flex flex-col items-center space-y-3">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isUploading}
                        onClick={() =>
                          document.getElementById("photo-upload")?.click()
                        }
                        className="border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {isUploading
                          ? "Téléchargement..."
                          : "Télécharger une photo"}
                      </Button>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <p className="text-sm text-slate-500">
                        Format accepté : JPG, PNG ou GIF (max. 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">
                    Informations personnelles
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="text-sm font-medium text-slate-700"
                      >
                        <User className="w-4 h-4 inline mr-2 text-blue-600" />
                        Nom complet <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="Votre nom complet"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700"
                      >
                        <Mail className="w-4 h-4 inline mr-2 text-blue-600" />
                        Adresse email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="votre@email.com"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-slate-700"
                      >
                        <Phone className="w-4 h-4 inline mr-2 text-blue-600" />
                        Numéro de téléphone{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+237 6XX XXX XXX"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        <MapPin className="w-4 h-4 inline mr-2 text-blue-600" />
                        Région de résidence{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("region", value)
                        }
                      >
                        <div className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre région" />
                          </SelectTrigger>
                        </div>

                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">
                    Informations professionnelles
                  </h3>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      <Code className="w-4 h-4 inline mr-2 text-blue-600" />
                      Domaine d&apos;expertise{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("domain", value)
                      }
                    >
                      <div className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre domaine principal" />
                        </SelectTrigger>
                      </div>

                      <SelectContent>
                        {domains.map((domain) => (
                          <SelectItem key={domain} value={domain}>
                            {domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="bio"
                      className="text-sm font-medium text-slate-700"
                    >
                      Biographie professionnelle{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Décrivez votre parcours, vos compétences, vos projets actuels et vos objectifs dans la tech..."
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                      required
                    />
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">
                    Compétences techniques
                  </h3>

                  <div>
                    <Label className="text-sm font-medium text-slate-700 mb-4 block">
                      Langages et technologies maîtrisés
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {programmingLanguages.map((language) => (
                        <div
                          key={language}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50"
                        >
                          <Checkbox
                            id={language}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={() =>
                              handleLanguageToggle(language)
                            }
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <Label
                            htmlFor={language}
                            className="text-sm text-slate-700 cursor-pointer"
                          >
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Networks */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">
                    <LinkIcon className="w-5 h-5 inline mr-2 text-blue-600" />
                    Présence en ligne (optionnel)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="linkedin"
                        className="text-sm font-medium text-slate-700"
                      >
                        Profil LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) =>
                          handleInputChange("linkedin", e.target.value)
                        }
                        placeholder="https://linkedin.com/in/votre-profil"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="github"
                        className="text-sm font-medium text-slate-700"
                      >
                        Profil GitHub
                      </Label>
                      <Input
                        id="github"
                        value={formData.github}
                        onChange={(e) =>
                          handleInputChange("github", e.target.value)
                        }
                        placeholder="https://github.com/votre-username"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="twitter"
                        className="text-sm font-medium text-slate-700"
                      >
                        Profil Twitter/X
                      </Label>
                      <Input
                        id="twitter"
                        value={formData.twitter}
                        onChange={(e) =>
                          handleInputChange("twitter", e.target.value)
                        }
                        placeholder="https://twitter.com/votre-username"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="website"
                        className="text-sm font-medium text-slate-700"
                      >
                        Site web personnel
                      </Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        placeholder="https://votre-site.com"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="instagram"
                        className="text-sm font-medium text-slate-700"
                      >
                        Profil Instagram
                      </Label>
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) =>
                          handleInputChange("instagram", e.target.value)
                        }
                        placeholder="https://instagram.com/votre-username"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="facebook"
                        className="text-sm font-medium text-slate-700"
                      >
                        Profil Facebook
                      </Label>
                      <Input
                        id="facebook"
                        value={formData.facebook}
                        onChange={(e) =>
                          handleInputChange("facebook", e.target.value)
                        }
                        placeholder="https://facebook.com/votre-profil"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="text-center pt-8 border-t border-slate-200">
                  <Button
                    type="submit"
                    disabled={isPending || !formData.photoUrl}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Inscription en cours...
                      </div>
                    ) : (
                      "Soumettre ma candidature"
                    )}
                  </Button>

                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Processus de validation :</strong> Votre
                      candidature sera examinée par notre équipe dans un délai
                      de 48-72h. Vous recevrez une notification par email
                      concernant le statut de votre candidature.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BeMemberPage;

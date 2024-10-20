import Publication from "@/interfaces/publication";
import FeaturedImage from "@/assets/images/preview_blog/css-tips-and-tricks.avif";
import ProfileImage from "@/assets/images/leaders/touza.jpg";
const date = new Date();

const publications: Publication[] = [
  {
    tags: ["Css", "HTML", "JS"],
    title:
      "Css tips and tricks",
    created_at: date,
    updated_at: date,
    published_by: {
      name: "Touza",
      profile_image: ProfileImage,
    },
    featured_image: {
      src: FeaturedImage.src,
      height: FeaturedImage.height,
      width: FeaturedImage.width,
      title: "A blog image",
    },
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti rerum ad. Enim dicta nemo totam optio officiis nam, id repudiandae voluptatem dolorum unde vero aspernatur soluta adipisci similique ipsam.",
  },
  {
    tags: ["Jeckpack"],
    title:
      "The impact of Technology on the workplace: how Technoloy is changing ?",
    created_at: date,
    updated_at: date,
    published_by: {
      name: "Touza",
      profile_image: "",
    },
    featured_image: {
      src: "",
      height: 300,
      width: 600,
      title: "A blog image",
    },
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti rerum ad. Enim dicta nemo totam optio officiis nam, id repudiandae voluptatem dolorum unde vero aspernatur soluta adipisci similique ipsam.",
  },
  {
    tags: ["Java", "Perl"],
    title:
      "Jetpack compose vs flutter, quel choix pour une app mobile moderne ?",
    created_at: date,
    updated_at: date,
    published_by: {
      name: "Touza",
      profile_image: "",
    },
    featured_image: {
      src: "",
      height: 300,
      width: 600,
      title: "A blog image",
    },
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti rerum ad. Enim dicta nemo totam optio officiis nam, id repudiandae voluptatem dolorum unde vero aspernatur soluta adipisci similique ipsam.",
  },
  {
    tags: ["Python"],
    title:
      "The impact of Technology on the workplace: how Technoloy is changing ?",
    created_at: date,
    updated_at: date,
    published_by: {
      name: "Touza",
      profile_image: "",
    },
    featured_image: {
      src: "",
      height: 300,
      width: 600,
      title: "A blog image",
    },
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti rerum ad. Enim dicta nemo totam optio officiis nam, id repudiandae voluptatem dolorum unde vero aspernatur soluta adipisci similique ipsam.",
  },
  {
    tags: ["Jeckpack"],
    title:
      "Jetpack compose vs flutter, quel choix pour une app mobile moderne ?",
    created_at: date,
    updated_at: date,
    published_by: {
      name: "Touza",
      profile_image: "",
    },
    featured_image: {
      src: "",
      height: 300,
      width: 600,
      title: "A blog image",
    },
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti rerum ad. Enim dicta nemo totam optio officiis nam, id repudiandae voluptatem dolorum unde vero aspernatur soluta adipisci similique ipsam.",
  },
  {
    tags: ["Jeckpack"],
    title:
      "The impact of Technology on the workplace: how Technoloy is changing ?",
    created_at: date,
    updated_at: date,
    published_by: {
      name: "Touza",
      profile_image: "",
    },
    featured_image: {
      src: "",
      height: 300,
      width: 600,
      title: "A blog image",
    },
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti rerum ad. Enim dicta nemo totam optio officiis nam, id repudiandae voluptatem dolorum unde vero aspernatur soluta adipisci similique ipsam.",
  },
  {
    tags: ["Jeckpack"],
    title:
      "The impact of Technology on the workplace: how Technoloy is changing ?",
    created_at: date,
    updated_at: date,
    published_by: {
      name: "Touza",
      profile_image: "",
    },
    featured_image: {
      src: "",
      height: 300,
      width: 600,
      title: "A blog image",
    },
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti rerum ad. Enim dicta nemo totam optio officiis nam, id repudiandae voluptatem dolorum unde vero aspernatur soluta adipisci similique ipsam.",
  },
  {
    tags: ["Jeckpack"],
    title:
      "The impact of Technology on the workplace: how Technoloy is changing ?",
    created_at: date,
    updated_at: date,
    published_by: {
      name: "Touza",
      profile_image: "",
    },
    featured_image: {
      src: "",
      height: 300,
      width: 600,
      title: "A blog image",
    },
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus deleniti rerum ad. Enim dicta nemo totam optio officiis nam, id repudiandae voluptatem dolorum unde vero aspernatur soluta adipisci similique ipsam.",
  },
];

export default publications;

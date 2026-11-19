export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ojas",
  description: "ojas' wall: projects, films, photos, and whatever people stick on it.",
  navItems: [
    { label: "projects", href: "/projects" },
    { label: "resume", href: "/resume" },
    { label: "digital garden ↗", href: "https://notebook.knowojas.com/" },
    { label: "github ↗", href: "https://github.com/0jas0jas" },
  ],
  links: {
    github: "https://github.com/0jas0jas",
    discord: "https://discordapp.com/users/507194607117795328",
    linkedin: "https://linkedin.com/in/0jas0jas",
    itch: "https://f1shf1sh.itch.io",
  },
};

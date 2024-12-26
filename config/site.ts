export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ojas",
  description: "ojas' website full of ojas' things.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Digital Garden🡕",
      href: "https://0jas0jas.github.io/mon-cahier/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/0jas0jas",
    discord: "https://discordapp.com/users/507194607117795328",
    linkedin: "https://linkedin.com/in/0jas0jas"
  },
};

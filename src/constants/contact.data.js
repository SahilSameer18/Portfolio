import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

export const contactLines = [
  { type: "comment", text: "// reach out through any channel or type in the shell" },
  {
    type: "entry",
    icon: FaEnvelope,
    cmd: "email",
    value: "sahilsameer.dev18@gmail.com",
    href: "mailto:sahilsameer.dev18@gmail.com",
    external: false,
    ariaLabel: "Send email to Sahil Sameer",
    color: "#ff5f56",
    copyable: true,
  },
  {
    type: "entry",
    icon: FaLinkedin,
    cmd: "linkedin",
    value: "/in/sahil-sameer-siddique",
    href: "https://www.linkedin.com/in/sahil-sameer-siddique/",
    external: true,
    ariaLabel: "Open LinkedIn profile",
    color: "#0077b5",
  },
  {
    type: "entry",
    icon: FaGithub,
    cmd: "github",
    value: "@SahilSameer18",
    href: "https://github.com/SahilSameer18",
    external: true,
    ariaLabel: "Open GitHub profile",
    color: "#c4c4c4",
    lightColor: "#374151",
  },
  {
    type: "entry",
    icon: FaInstagram,
    cmd: "instagram",
    value: "@sahilsameer18",
    href: "https://www.instagram.com/sahilsameer18/",
    external: true,
    ariaLabel: "Open Instagram profile",
    color: "#E1306C",
  },
];

export const contactChecks = [
  "email found",
  "linkedin found",
  "github found",
  "instagram found",
];
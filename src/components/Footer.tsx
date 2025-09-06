import { SiLinkedin, SiGithub } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">© {currentYear} BiteBack. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a
            href="https://github.com/thesushilsharma/BiteBack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <SiGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <SiLinkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

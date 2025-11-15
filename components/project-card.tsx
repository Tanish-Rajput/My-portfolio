import { Github } from 'lucide-react';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  githubLink: string;
}

export function ProjectCard({ image, title, description, githubLink }: ProjectCardProps) {
  return (
    <div className="bg-border/20 rounded-lg overflow-hidden hover:bg-border/40 transition-colors duration-300 h-full flex flex-col">
      {/* Image Section */}
      <div className="w-full h-48 bg-border/30 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-6 gap-4">
        {/* Title */}
        <h3 className="text-xl font-sentient text-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="text-foreground/70 font-mono text-sm flex-1">
          {description}
        </p>

        {/* GitHub Link */}
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-mono text-sm transition-colors"
        >
          <Github className="w-4 h-4" />
          View on GitHub
        </a>
      </div>
    </div>
  );
}

'use client';

import { ProjectCard } from '@/components/project-card';
import { GL } from '@/components/gl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';

const projects = [
  {
    id: 1,
    image: '/placeholder01.jpg',
    title: 'IntelliDesk – Intelligent RAG-Based Enterprise Chatbot',
    description: "IntelliDesk is a Retrieval-Augmented Generation (RAG) system designed to help companies build their own internal ChatGPT-like assistant. The platform allows organizations to securely connect their Google Drive, Notion, or upload custom documents, enabling the chatbot to respond using their private knowledge base.",
    githubLink: 'https://github.com/Tanish-Rajput/IntelliDesk'
  },
  {
    id: 2,
    image: '/placeholder02.png',
    title: 'EduSync – AI-Powered Smart Classroom Attendance System',
    description: 'EduSync is an intelligent attendance automation system that uses real-time face recognition to identify multiple students simultaneously inside a classroom and mark their attendance instantly. The system processes live video input, detects and recognizes faces, and updates attendance records without manual intervention—making the entire process faster, accurate, and fully automated. \n \nEduSync demonstrates my ability to work with computer vision, face recognition models, real-time video processing, and end-to-end system development for real-world automation.',
    githubLink: 'https://github.com/Tanish-Rajput/EduSync-Face-Recognition-API'
  },
  {
    id: 3,
    image: '/placeholder03.png',
    title: 'Neural Collaborative Filtering – Deep Learning Movie Recommendation System',
    description: 'This project is a deep learning–based movie recommendation system built using TensorFlow/Keras, designed to predict personalized movie suggestions with high accuracy. Using Neural Collaborative Filtering, the system learns dense embedding representations of users and movies, captures non-linear interaction patterns through neural networks, and predicts ratings for unseen movie–user pairs. Trained on the MovieLens 100K dataset, it provides meaningful recommendations and includes an interactive CLI for exploring user preferences.',
    githubLink: 'https://github.com/Tanish-Rajput/Deep-Neural-Collaborative-Filtering-Movie-Recommendation-System'
  }
];

export default function ProjectsPage() {
  useEffect(() => {
    // Disable any debug/control panels that might be in the GL component
    const hideControls = () => {
      const controlPanels = document.querySelectorAll('.leva-container, .leva__root, [class*="leva"]');
      controlPanels.forEach(panel => {
        if (panel instanceof HTMLElement) {
          panel.style.display = 'none';
        }
      });
    };

    // Run immediately and after a short delay to catch dynamically created panels
    hideControls();
    const timer = setTimeout(hideControls, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-svh relative">
      <GL hovering={false} />
      <div className="relative z-10 pt-24 pb-16 px-4 md:px-8">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto mb-12">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-foreground/60 hover:text-foreground">
              <ChevronLeft className="w-4 h-4" />
              Back to Chat
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-6xl mx-auto mb-16 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient mb-4 text-balance">
            Featured <br />
            <i className="font-light">projects</i>
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance max-w-2xl mx-auto">
            A selection of AI/ML projects and solutions that showcase expertise in Artificial Intelligence, machine learning and software engineering
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              description={project.description}
              githubLink={project.githubLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
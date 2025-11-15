'use client'

import { ChatInterface } from "@/components/chat-interface";
import { GL } from "@/components/gl";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <GL hovering={false} />
      <ChatInterface />
      <Leva hidden />
    </>
  );
}

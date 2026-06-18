"use client";

import { useState } from "react";
import StudentDashboard from "./dashboard/page";

export default function Home() {
  const [tab, setTab] = useState("upload");

  // Directly serves your real Topperdeck platform component layout as the home page view
  return <StudentDashboard />;
}
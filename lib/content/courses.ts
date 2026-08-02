import type { Course, LanguageId } from "@/lib/types";

// C++ known
import { cppToPython } from "./cppToPython";
import { cppToJava } from "./cppToJava";
import { cppToJavascript } from "./cppToJavascript";

// Python known
import { pythonToCpp } from "./pythonToCpp";
import { pythonToJava } from "./pythonToJava";
import { pythonToJavascript } from "./pythonToJavascript";

// Java known
import { javaToPython } from "./javaToPython";
import { javaToCpp } from "./javaToCpp";
import { javaToJavascript } from "./javaToJavascript";

// JavaScript known
import { javascriptToPython } from "./javascriptToPython";
import { javascriptToJava } from "./javascriptToJava";
import { javascriptToCpp } from "./javascriptToCpp";

export const COURSES: Course[] = [
  // From C++
  cppToPython,
  cppToJava,
  cppToJavascript,

  // From Python
  pythonToCpp,
  pythonToJava,
  pythonToJavascript,

  // From Java
  javaToPython,
  javaToCpp,
  javaToJavascript,

  // From JavaScript
  javascriptToPython,
  javascriptToJava,
  javascriptToCpp,
];

export function findCourse(
  known: LanguageId,
  target: LanguageId,
): Course | undefined {
  return COURSES.find(
    (c) => c.knownLang === known && c.targetLang === target,
  );
}

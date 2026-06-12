#!/usr/bin/env node

import { execSync } from "child_process";

const [, , command, component] = process.argv;
const BASE_URL = "https://shadcn-3d-ui.vercel.app/r";

if (command === "add" && component) {
    const url = `${BASE_URL}/${component}.json`;
    console.log(`📦 Installing ${component}...`);
    execSync(`npx shadcn@latest add "${url}"`, { stdio: "inherit" });
} else if (command === "add") {
    console.log("Usage: npx 3d-ui add <component>");
} else {
    console.log("Usage: npx 3d-ui add <component>");
}
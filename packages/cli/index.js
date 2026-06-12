#!/usr/bin/env node

// Safe, clean, and modern ES module import syntax
import { execSync } from "node:child_process";

const action = process.argv[2];
const component = process.argv[3];

// Update this URL once you deploy your 'public/registry/' directory to Vercel/Netlify
const REGISTRY_BASE_URL = "https://shadcn-3d-ui.vercel.app/registry";

if (action === "add" && component) {
    console.log(`\n📦 \x1b[36m3D-UI Engine:\x1b[0m Resolving installation recipe for "${component}"...`);

    const componentRegistryUrl = `${REGISTRY_BASE_URL}/${component}.json`;

    try {
        execSync(`npx shadcn@latest add ${componentRegistryUrl}`, { stdio: "inherit" });
    } catch (error) {
        console.error(`\n❌ \x1b[31mError:\x1b[0m Failed to execute shadcn installation for ${component}.`);
        process.exit(1);
    }
} else {
    const remainingArgs = process.argv.slice(2).join(" ");
    try {
        execSync(`npx shadcn@latest ${remainingArgs}`, { stdio: "inherit" });
    } catch (error) {
        process.exit(1);
    }
}
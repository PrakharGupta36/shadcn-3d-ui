#!/usr/bin/env node

import { execSync } from "node:child_process";

const action = process.argv[2];
const component = process.argv[3];

const REGISTRY_INDEX_URL = "https://shadcn-3d-ui.vercel.app/registry/index.json";

if (action === "add" && component) {
    console.log(`\n📦 \x1b[36m3D-UI Engine:\x1b[0m Resolving installation recipe for "${component}"...`);

    // Format matching the new shadcn multi-item index selector rule
    const targetRegistryCommand = `${REGISTRY_INDEX_URL}:${component}`;

    try {
        execSync(`npx shadcn@latest add ${targetRegistryCommand}`, { stdio: "inherit" });
    } catch (error) {
        console.error(`\n❌ \x1b[31mError:\x1b[0m Failed to execute shadcn installation.`);
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
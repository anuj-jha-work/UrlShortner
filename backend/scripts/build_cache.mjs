import { spawnSync } from "child_process";
import { mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..");
const sourcePath = path.resolve(backendRoot, "cpp", "lru_cache.cpp");
const outputDir = path.resolve(backendRoot, "cache");
const outputName = process.platform === "win32" ? "lru_cache.exe" : "lru_cache";
const outputPath = path.resolve(outputDir, outputName);

mkdirSync(outputDir, { recursive: true });

const compilerCandidates = process.env.CXX
    ? [process.env.CXX]
    : ["g++", "clang++", "c++"];

const args = ["-std=c++17", "-O2", "-o", outputPath, sourcePath];

let built = false;
let lastError = null;

for (const compiler of compilerCandidates) {
    console.log(`[build:cache] Trying compiler: ${compiler}`);
    const result = spawnSync(compiler, args, { stdio: "inherit" });

    if (result.error) {
        lastError = result.error;
        if (result.error.code === "ENOENT") {
            continue;
        }
        break;
    }

    if (result.status === 0) {
        built = true;
        console.log(`[build:cache] Built cache executable at ${outputPath}`);
        break;
    }

    lastError = new Error(`${compiler} exited with code ${result.status}`);
}

if (!built) {
    const details = lastError ? ` (${lastError.message})` : "";
    console.error(`[build:cache] Failed to compile cpp cache${details}`);
    process.exit(1);
}

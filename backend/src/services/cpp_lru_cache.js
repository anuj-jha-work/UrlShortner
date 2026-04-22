import { spawn } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
class CppLruCacheClient {
    child = null;
    enabled = false;
    buffer = "";
    pending = new Map();
    requestId = 0;
    init(capacity = 500) {
        if (this.child) {
            return;
        }
        const exeName = process.platform === "win32" ? "lru_cache.exe" : "lru_cache";
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const executablePath = path.resolve(__dirname, "../../cache", exeName);
        if (!existsSync(executablePath)) {
            this.enabled = false;
            console.warn(`[cpp-lru] Executable not found at ${executablePath}. Cache is disabled. Run npm run build:cache first.`);
            return;
        }
        this.child = spawn(executablePath, [String(capacity)], {
            stdio: ["pipe", "pipe", "pipe"],
            windowsHide: true,
        });
        this.enabled = true;
        console.log(`[cpp-lru] Cache process spawned with capacity ${capacity}`);
        this.child.stdout.setEncoding("utf8");
        this.child.stdout.on("data", (chunk) => {
            this.handleStdout(chunk);
        });
        this.child.stderr.setEncoding("utf8");
        this.child.stderr.on("data", (chunk) => {
            console.error(`[cpp-lru] ${chunk.trim()}`);
        });
        this.child.on("exit", (code) => {
            this.enabled = false;
            this.child = null;
            for (const [, request] of this.pending) {
                request.reject(new Error(`cpp cache process exited with code ${code}`));
            }
            this.pending.clear();
            console.warn(`[cpp-lru] Cache process exited with code ${code}. Cache is disabled.`);
        });
    }
    async get(key) {
        if (!this.enabled) {
            return null;
        }
        const encodedKey = this.encode(key);
        const response = await this.send("GET", encodedKey, "");
        if (response === null) {
            return null;
        }
        return this.decode(response);
    }
    async set(key, value) {
        if (!this.enabled) {
            return;
        }
        const encodedKey = this.encode(key);
        const encodedValue = this.encode(value);
        await this.send("SET", encodedKey, encodedValue);
    }
    async del(key) {
        if (!this.enabled) {
            return;
        }
        const encodedKey = this.encode(key);
        await this.send("DEL", encodedKey, "");
    }
    encode(value) {
        return Buffer.from(value, "utf8").toString("base64");
    }
    decode(value) {
        return Buffer.from(value, "base64").toString("utf8");
    }
    handleStdout(chunk) {
        this.buffer += chunk;
        let newlineIndex = this.buffer.indexOf("\n");
        while (newlineIndex !== -1) {
            const line = this.buffer.slice(0, newlineIndex).replace(/\r$/, "");
            this.buffer = this.buffer.slice(newlineIndex + 1);
            this.resolveLine(line);
            newlineIndex = this.buffer.indexOf("\n");
        }
    }
    resolveLine(line) {
        if (!line) {
            return;
        }
        const parts = line.split("\t");
        const id = parts[0];
        const status = parts[1];
        const payload = parts.length >= 3 ? parts.slice(2).join("\t") : "";
        const request = this.pending.get(id);
        if (!request) {
            return;
        }
        this.pending.delete(id);
        if (status === "OK") {
            request.resolve(payload || "");
            return;
        }
        if (status === "MISS") {
            request.resolve(null);
            return;
        }
        if (status === "PONG") {
            request.resolve("");
            return;
        }
        request.reject(new Error(payload || "cache error"));
    }
    send(op, key, value) {
        if (!this.child || !this.child.stdin.writable) {
            this.enabled = false;
            return Promise.resolve(null);
        }
        const id = String(++this.requestId);
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
            const payload = `${id}\t${op}\t${key}\t${value}\n`;
            this.child?.stdin.write(payload, (error) => {
                if (error) {
                    this.pending.delete(id);
                    reject(error);
                }
            });
        });
    }
}
const cppLru = new CppLruCacheClient();
export const initCppLruCache = () => {
    console.log('[cpp-lru] Initializing cache...');
    cppLru.init(500);
    if (cppLru.enabled) {
        console.log('[cpp-lru] Cache initialized successfully');
    }
};
export const setUrlInCache = async (shortId, payload) => {
    try {
        if (!cppLru.enabled) {
            console.log(`[cpp-lru] SET skipped (cache disabled) - shortId: ${shortId}`);
            return;
        }
        await cppLru.set(shortId, JSON.stringify(payload));
        console.log(`[cpp-lru] SET success - shortId: ${shortId}`);
    }
    catch (error) {
        console.warn("[cpp-lru] set failed:", error);
    }
};
export const getUrlFromCache = async (shortId) => {
    try {
        if (!cppLru.enabled) {
            console.log(`[cpp-lru] GET skipped (cache disabled) - shortId: ${shortId}`);
            return null;
        }
        const value = await cppLru.get(shortId);
        if (!value) {
            console.log(`[cpp-lru] GET miss - shortId: ${shortId}`);
            return null;
        }
        console.log(`[cpp-lru] GET hit - shortId: ${shortId}`);
        return JSON.parse(value);
    }
    catch (error) {
        console.warn("[cpp-lru] get failed:", error);
        return null;
    }
};
export const deleteUrlFromCache = async (shortId) => {
    try {
        await cppLru.del(shortId);
    }
    catch (error) {
        console.warn("[cpp-lru] delete failed:", error);
    }
};

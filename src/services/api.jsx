const BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "";

async function handle(res, path) {
    if (!res.ok) throw new Error(`HTTP ${res.status} en ${path}`);
    return res.json();
}

export async function apiGet(path) {
    const p = path.startsWith("/") ? path : `/${path}`;
    const res = await fetch(`${BASE}${p}`, { headers: { "Content-Type": "application/json" } });
    return handle(res, path);
}

export async function apiPost(path, body) {
    const p = path.startsWith("/") ? path : `/${path}`;
    const res = await fetch(`${BASE}${p}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return handle(res, path);
}

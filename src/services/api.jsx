const BASE =
    (import.meta.env.VITE_API_BASE || "/api").replace(/\/+$/, "");

async function handleResponse(res, path) {
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Error ${res.status} en ${path}: ${text}`);
    }

    if (!contentType.includes("application/json")) {
        const text = await res.text().catch(() => "");
        throw new Error(`Respuesta no JSON desde ${path}: ${text.slice(0,100)}`);
    }

    return res.json();
}

export async function apiGet(path) {
    const p = path.startsWith("/") ? path : `/${path}`;
    const url = `${BASE}${p}`;
    const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
    return handleResponse(res, path);
}

export async function apiPost(path, body) {
    const p = path.startsWith("/") ? path : `/${path}`;
    const url = `${BASE}${p}`;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return handleResponse(res, path);
}

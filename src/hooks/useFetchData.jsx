import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

export function useFetchData(path) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let alive = true;
        setLoading(true);
        setError("");

        apiGet(path)
            .then((json) => alive && setData(json))
            .catch((e) => alive && setError(e.message || "Error"))
            .finally(() => alive && setLoading(false));

        return () => { alive = false; };
    }, [path]);

    return { data, loading, error };
}

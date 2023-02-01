import RequestException from "./exceptions/request-exception.js";

export async function getJson(url) {
    try {
        const response = await fetch(url);
        const jsoBody = await response.json();
        return jsoBody;
    }
    catch (e) {
        throw new RequestException("Erro ao realizar requisição");
    }
}
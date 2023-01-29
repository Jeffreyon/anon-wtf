import Pocketbase from "pocketbase";

const pb = new Pocketbase(import.meta.env.VITE_PB_API_URL);

export default pb;

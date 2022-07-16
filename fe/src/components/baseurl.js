const baseUrl = process.env.NODE_ENV === "production"
    ? "https://shopuwuh.herokuapp.com"
    : "http://localhost:80";
export default baseUrl;
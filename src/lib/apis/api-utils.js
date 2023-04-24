
export function createApiReq(url, auth, body) {
  const token = auth ? JSON.parse(localStorage.getItem("token")) : "";
  return { url: url, token: token, body: body };
}

export const IS_RSPP = true;

export async function fetchUserInfo() {
  const res = await fetch(
    "http://localhost:3000/user-info",
    { credentials: "include" }
  );
  if (!res.ok) {
    return null;
  }
  const userInfo = (await res.json()).userInfo;
  userInfo.isPaleocapa = userInfo.email.endsWith("itispaleocapa.it");
  userInfo.type = userInfo.email.startsWith("rspp")
    ? "rspp"
    : (userInfo.email.match(/(?<=.*\..*\.).*(?=@)/) || [])[0] === "studente"
      ? "student"
      : "other";
  return userInfo;
}

import Cookies from "js-cookie";

export default async function logOut(router) {
  try {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      Cookies.remove("authToken");
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}

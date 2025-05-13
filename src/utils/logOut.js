export default async function logOut() {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include", // Pastikan cookie dikirim dalam request
    });
    
    if (response.ok) {
      console.log("Logout successful");
      localStorage.removeItem("user");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}

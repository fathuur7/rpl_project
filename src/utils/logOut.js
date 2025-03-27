import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default async function logOut() {
    try {
    // Call logout API
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      // Remove auth cookies
      Cookies.remove('authToken');
      
      // Redirect to home or login page
      router.push("/");
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
}

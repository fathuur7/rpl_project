const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/users/`,{
            method: "GET"
        });
        if (!response.ok) {
        throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
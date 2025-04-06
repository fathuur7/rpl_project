export const getAllUsers = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/users/",{
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
// Pastikan hook registration mengembalikan struktur benar

export const useRegistration = () => {
  const registerUser = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      const result = await response.json();

      return {
        success: response.ok,
        message: result.message,
        data: result.data
      };
    } catch (error) {
      console.error('Registration Error:', error);
      return {
        success: false,
        message: 'Network error'
      };
    }
  };

  return { registerUser };
};
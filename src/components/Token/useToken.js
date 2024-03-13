import { useState } from "react";

// export default function useToken() {
//   const getToken = () => {
//     const tokenString = localStorage.getItem("token");
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token;
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = (userToken) => {
//     localStorage.setItem("token", JSON.stringify(userToken));
//     setToken(userToken.token);
//   };

//   const generateToken = async (credentials) => {
//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message);
//       }
//       return data;
//     } catch (error) {
//       console.error("Error generating token:", error.message);
//       throw error;
//     }
//   };

//   return {
//     setToken: saveToken,
//     token,
//     generateToken,
//   };
// }


export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    console.log("Received token:", userToken.token); // Debugging statement
    localStorage.setItem("token", JSON.stringify(userToken));
    const storedToken = localStorage.getItem("token");
    console.log("Stored token:", storedToken); // Debugging statement
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}

// export function getTherapistIdFromToken() {
//     const token = localStorage.getItem("token");
//     if (!token) return null;

//     try {
//         const { therapistId } = JSON.parse(atob(token.split(".")[1])); // Decode token payload
//         return therapistId;
//     } catch (error) {
//         console.error("Error decoding token:", error);
//         return null;
//     }
// }

// export function getTherapistFullNameFromToken() {
//     const token = localStorage.getItem("token");
//     if (!token) return null;

//     try {
//         const { therapistFullName } = JSON.parse(atob(token.split(".")[1])); // Decode token payload
//         return therapistId;
//     } catch (error) {
//         console.error("Error decoding token:", error);
//         return null;
//     }
// }

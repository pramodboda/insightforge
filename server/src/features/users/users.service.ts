import * as userModel from "./users.model";


// Get - 100 employees
export async function getEmployees100(){
    return userModel.getEmployees100();
}

// // Create - employee
// export async function createUser(input: {
//     name: string;
//     email: string;
//   }) {
//     // Add business rules here:
//     // - validate required fields
//     // - check whether email already exists
//     // - apply business-specific rules
  
//     return userModel.create(input);
//   }
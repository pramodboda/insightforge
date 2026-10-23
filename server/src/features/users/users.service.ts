import * as userModel from "./users.model";


// Get - 100 employees
export async function getEmployees(){
    return userModel.getEmployees();
}

// // Create - employee
// export async function createEmployee(input: {
//     name: string;
//     email: string;
//   }) {
//     // Add business rules here:
//     // - validate required fields
//     // - check whether email already exists
//     // - apply business-specific rules
  
//     return userModel.createEmployee(input);
//   }
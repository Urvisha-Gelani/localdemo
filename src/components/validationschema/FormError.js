import * as Yup from "yup";
import { company } from "../../commonJs/Common";

export const SignupSchema = Yup.object({
    username: Yup.string().min(2).matches(/^\S*$/, 'Username cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Username must contain at least one letter').matches(/^[a-zA-Z0-9]+$/, "Invalid username format").required("Please enter username"),
    first_name: Yup.string().matches(/^\S*$/, 'Firstname cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Fistname must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid firstname format").required("Please enter first name"),
    last_name: Yup.string().matches(/^\S*$/, 'Lastname cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Lastname must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid lastname format").required("Please enter last name"),
    email: Yup.string().email('Invalid email address').test(
        'is-not-special-char-only',
        'Email cannot be composed only of special characters',
        value => !/^[^a-zA-Z0-9.@]*$/.test(value) // Ensure the email isn't made up solely of special characters
    ).matches(/^\S*$/, 'Email cannot contain spaces').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address').required("Please enter email"),
    gender: Yup.string().required('Please select an option'),
    password: Yup.string().min(6).matches(/^\S*$/, 'Password cannot contain spaces').required("Please enter password"),
    password2: Yup.string().matches(/^\S*$/, 'Confirm password cannot contain spaces').required().oneOf([Yup.ref('password'), null], "Password must match").required("Please enter confirm_password")
})

export const LogInSchema = Yup.object({
    email_or_username: Yup.string().min(2).max(50).matches(/^\S*$/, 'Username cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Username Or Email must contain at least one letter').matches(/^[a-zA-Z0-9@.]+$/, "Invalid username or email format").required("Please enter username Or email"),
    password: Yup.string().min(6).matches(/^\S*$/, 'Email cannot contain spaces').required("Please enter password"),
})


export const CompanySchema = Yup.object({
    name: Yup.string().matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Company name must contain letters').matches(/^[a-zA-Z0-9\s,'-.]*$/, 'Invalid characters').required("Please enter company name"),
    location: Yup.string().min(2).matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Company location must contain letters').required("Please enter company location"),
    about: Yup.string().matches(/([a-zA-Z])[a-zA-Z0-9]/, 'about must contain letters').matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').required("Please enter company about"),
    type: Yup.string().required("Please select company type")
})
export const DepartmentSchema = Yup.object({
    name: Yup.string().required("Please select department"),
    description: Yup.string().matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Description must contain letters').matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').required("Please enter description"),
})

export const EmployeesSchema = Yup.object({
    name: Yup.string().matches(/^\S*$/, 'Name cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Name must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid name format").required("Please enter name"),
    email: Yup.string().email('Invalid email address').test(
        'is-not-special-char-only',
        'Email cannot be composed only of special characters',
        value => !/^[^a-zA-Z0-9.@]*$/.test(value) // Ensure the email isn't made up solely of special characters
    ).matches(/^\S*$/, 'Email cannot contain spaces').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address').required("Please enter email"),
    address: Yup.string().min(2).matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Address must contain letters').required("Please enter address"),
    about: Yup.string().matches(/([a-zA-Z])[a-zA-Z0-9]/, 'about must contain letters').matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').required("Please enter about"),
    phone: Yup.string().min(10).matches(/^\+?\d{0,10}$/, 'Phone number is not valid').matches(/^\S*$/, 'Phone number cannot contain spaces').required('Please enter phone number'),
    position: Yup.string().required("Please enter position"),
})
export const DepartmentEmployeesSchema = Yup.object({
    name: Yup.string().matches(/^\S*$/, 'Name cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Name must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid name format").required("Please enter name"),
    email: Yup.string().email('Invalid email address').test(
        'is-not-special-char-only',
        'Email cannot be composed only of special characters',
        value => !/^[^a-zA-Z0-9.@]*$/.test(value) // Ensure the email isn't made up solely of special characters
    ).matches(/^\S*$/, 'Email cannot contain spaces').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address').required("Please enter email"),
    address: Yup.string().min(2).matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Address must contain letters').required("Please enter address"),
    about: Yup.string().matches(/([a-zA-Z])[a-zA-Z0-9]/, 'about must contain letters').matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').required("Please enter about"),
    phone: Yup.string().min(10).matches(/^\+?\d{0,10}$/, 'phone number is not valid').matches(/^\S*$/, 'Phone number cannot contain spaces').required('Please enter phone number'),
    position: Yup.string().required("Please enter position"),
    department_id: Yup.string().required("Please select department"),

})
export const AllDepartmentSchema = Yup.object({
    name: Yup.string().required("Please select department"),
    description: Yup.string().matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Description must contain letters').matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').required("Please enter description"),
    company_id : Yup.string().required("Please select company name")
})
export const allEmployeesSchema = Yup.object({
    name: Yup.string().matches(/^\S*$/, 'Name cannot contain spaces').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Name must contain at least one letter').matches(/^[a-zA-Z0-9_]+$/, "Invalid name format").required("Please enter name"),
    email: Yup.string().email('Invalid email address').test(
        'is-not-special-char-only',
        'Email cannot be composed only of special characters',
        value => !/^[^a-zA-Z0-9.@]*$/.test(value) // Ensure the email isn't made up solely of special characters
    ).matches(/^\S*$/, 'Email cannot contain spaces').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address').required("Please enter email"),
    address: Yup.string().min(2).matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').matches(/([a-zA-Z])[a-zA-Z0-9]/, 'Address must contain letters').required("Please enter address"),
    about: Yup.string().matches(/([a-zA-Z])[a-zA-Z0-9]/, 'about must contain letters').matches(/^[a-zA-Z0-9\s,'-]*$/, 'Invalid characters').required("Please enter about"),
    phone: Yup.string().min(10).matches(/^\+?\d{0,10}$/, 'Phone number is not valid').matches(/^\S*$/, 'Phone number cannot contain spaces').required('Please enter phone number'),
    position: Yup.string().required("Please enter position"),
    company_id : Yup.string().required("Please select company"),
    department_id: Yup.string().required("Please select department"),
    
})


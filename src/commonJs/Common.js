import { createAsyncThunk } from "@reduxjs/toolkit"

export const apiToken = () => {
    return localStorage.getItem("userToken")
}
export const company = () => {
    return JSON.parse(localStorage.getItem("company"))
}
export const refreshToken = () => {
    return localStorage.getItem("refreshToken")
}
const localHost = process.env.REACT_APP_LOCAL_HOST

export const getCompany = async (token, page) => {
    const response = await fetch(`${localHost}api/companies/?page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    return result
}
export const refreshAPI = async () => {
    const data = {
        refresh : localStorage.getItem("refreshToken")
    }
    const refreshResponse = await fetch(`${localHost}api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  
    })
    const resfreshResult = await refreshResponse.json()
    localStorage.setItem("userToken", resfreshResult.access)
    localStorage.setItem("refreshToken", resfreshResult.refresh)
}

export const usersApi = async (pageName, data) => {
    const response = await fetch(`${localHost}api/user/${pageName}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    const resultRes = await response.json();
    return resultRes
}

let result = []
export const getDepartment = async (id, page) => {
    const response = await fetch(`${localHost}api/departments/?page=${page}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const dapartmentRes = await response.json()
    result = [...result, ...dapartmentRes.data.Departments]
    if (dapartmentRes.data.Departments.length === 10) {
        page = page + 1;
        await getDepartment(id, page)

    }
    return { dapartmentRes: dapartmentRes, id: id, result: result }
}
export const getCompanyDepart = async (id, page) => {
    const response = await fetch(`${localHost}api/company/${id}/department?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const getDepartmentRes = await response.json()
    return getDepartmentRes

}

export const departmentAddDeleteApi = async (api, method, data, id, page , companies) => {
    const response = await fetch(api, {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const departResponse = await response.json()
    if (departResponse.success) {
        if(companies === undefined) {

            return getCompanyDepart(id, page)
        }else {
            return allDepartments(page)
        }
    } else {
        return departResponse
    }
}
export const allDepartments = async(page) => {
    const response = await fetch(`${localHost}api/departments/?page=${page}` , {
        method : "GET",
        headers : {
            'Content-Type': 'application/json'
        }
    })
    const allDepartmentRes = await response.json()
    return allDepartmentRes
}
export const getDepartmentAllEmployees = async( department_id,page) => {
    const response = await fetch(`${localHost}api/department/${department_id}/employee?page=${page}` , {
        method : "GET",
        headers : {
            'Content-Type': 'application/json'
        }
       
    })
    const EmloyeesRes = await response.json()
    return EmloyeesRes
}   
export const postDepartmentEmployees = async (url , method , data , page  ,companyAllEmployees, companies) => {
    const response = await fetch(url , {
        method : `${method}`,
        headers : {
            'Authorization': `Bearer ${apiToken()}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
    const employeesResponse = await response.json()
    if(employeesResponse.success) {
        if(companyAllEmployees !== undefined) {
            return getCompanyAllEmployees({company_id : data.company_id , page : page})
        }else if(companies !== undefined) {
            return getUsersAllEmployees(page)
        }
        else {
            return getDepartmentAllEmployees( data.department_id , page)
        }
    }
    return employeesResponse

}
export const getCompanyAllEmployees = async(data) => {
    const response = await fetch(`${localHost}api/company/${data.company_id}/employees/?page=${data.page}` , {
        method :"GET",
        headers : {
            'Authorization': `Bearer ${apiToken()}`,
            'Content-Type': 'application/json'
        }
    })
    const responseResult = await response.json()
    return responseResult
}
export const getUsersAllEmployees = async(page) => {
    const response = await fetch(`${localHost}api/employees/?page=${page}` , {
        method:"GET",
        headers : {
             'Authorization': `Bearer ${apiToken()}`,
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result
}
export const convertDate = (date) => {
    const localDate = new Date(date);
    const localDateString = localDate.toLocaleString();
    return localDateString
}


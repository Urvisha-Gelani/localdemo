import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  allDepartments, apiToken, companyId, departmentAddDeleteApi, getCompany, getCompanyAllEmployees, getCompanyDepart, getDepartmentAllEmployees, getUsersAllEmployees, postDepartmentEmployees, refreshAPI, usersApi } from "../../commonJs/Common";
const localHost = process.env.REACT_APP_LOCAL_HOST
console.log(localHost, "*************************");


export const addUser = createAsyncThunk("addUser", async (data) => {
    const register = "register"
    return usersApi(register, data)
})
export const logInUser = createAsyncThunk("logInUser", async (data) => {
    const login = "login"
    return usersApi(login, data)
})
export const getUsers = createAsyncThunk('getUsers', async (token) => {
    const response = await fetch(`${localHost}api/user/profile/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
    const result = await response.json();
    
    return result
})
export const getCompaniesList = createAsyncThunk('getCompaniesList', async (data) => {
    return getCompany(data.apiToken, data.page)
})
export const getCompanydetails = createAsyncThunk('getCompanydetails', async (data) => {
    const response = await fetch(`${localHost}api/companies/${data.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    
    return result
})
export const addCompanies = createAsyncThunk('addCompanies', async (data) => {
    const response = await fetch(`${localHost}api/companies/?type=${data.values.type}&page=${data.page}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.values)
    })
    const companyResult = await response.json();
    return companyResult
})
export const deleteCompany = createAsyncThunk('deleteCompany', async (data) => {
    const response = await fetch(`${localHost}api/companies/${data.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return getCompany(data.token, data.currentPage)

})
export const updateCompnay = createAsyncThunk('updateCompnay', async (data) => {
    const response = await fetch(`${localHost}api/companies/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.value)
    })
    const result = await response.json()
    if (result.success) {
        return getCompany(data.token, data.page)
    } else {
        return result
    }
})
export const getCompanyDepartment = createAsyncThunk('getCompanyDepartment', async (data) => {
    return getCompanyDepart(data.companyID, data.page)
})
export const departmentAPI = createAsyncThunk('departmentAPI', async (data) => {
    const api = (`${localHost}api/departments/?page=${data.page}`)
    const method = "POST"
    return departmentAddDeleteApi(api, method, data.value, data.value.company_id, data.page, data.companies)
})
export const updateDepartAPI = createAsyncThunk('updateDepartAPI', async (data) => {
    const api = (`${localHost}api/departments/${data.id}`)
    const method = "PATCH"
    return departmentAddDeleteApi(api, method, data.value, data.value.company_id, data.page, data.companies)
})

export const deleteDepartmentAPI = createAsyncThunk('deleteDepartmentAPI', async (data) => {
    const response = await fetch(`${localHost}api/departments/${data.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (data.companies === undefined) {

        return getCompanyDepart(data.comapny_id, data.page)
    } else {
        return allDepartments(data.page)
    }

})
export const getAllDepartmentList = createAsyncThunk('getAllDepartmentList', async (page) => {
    return allDepartments(page)
})
export const getOneDepartment = createAsyncThunk('getOneDepartment', async (id) => {
    const response = await fetch(`${localHost}api/departments/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const departmentResult = await response.json()
    return departmentResult
})
export const departmentEmployees = createAsyncThunk('departmentEmployees', async (data) => {
    return getDepartmentAllEmployees(data.department_id, data.page)
})
export const addDepartmentEmployees = createAsyncThunk('addDepartmentEmployees', async (data) => {
    const url = (`${localHost}api/employees/?page=${data.page}`)
    const method = "POST"
    return postDepartmentEmployees(url, method, data.value, data.page, data.companyAllEmployees  , data.companies)
})
export const updateDepartmentEmployees = createAsyncThunk('updateDepartmentEmployees', async (data) => {
    const url = (`${localHost}api/employees/${data.id}`)
    const method = "PATCH"
    return postDepartmentEmployees(url, method, data.value, data.page, data.companyAllEmployees , data.companies)
})
export const deleteDepartmentEmployees = createAsyncThunk('deleteDepartmentEmployees', async (data) => {
    const response = await fetch(`${localHost}api/employees/${data.employees_id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (data.companyAllEmployees === undefined) {
        if(data.companies !== undefined) {
            return getUsersAllEmployees(data.page)
        }else {
            return getDepartmentAllEmployees(data.department_id, data.page)
        }
    } else {
        return getCompanyAllEmployees({ company_id: data.company_id, page: data.page })
    }
})
export const companyEmployees = createAsyncThunk('companyEmployees', async (data) => {
    return getCompanyAllEmployees(data)
})
export const usersAllEmployees = createAsyncThunk('usersAllEmployees' , async(page) => {
    return getUsersAllEmployees(page)
})
export const userSlice = createSlice({
    name: "User",
    initialState: {
        Users: [],
        companies: [],
        company: [],
        department: [],
        oneDepartment: [],
        employees: [],
        companyAllEmployees: [],
        createUser: "",
        tokenExpire: 10,
        signInSuccess: false,
        userLogIn: "",
        logInSuccess: false,
        addCopmaniError: "",
        deleteSuccessfully: false,
        departmentError: "",
        departmentSuccess: false,
        departmentDeleteSuccess: false,
        loading: false,
        error: false,
        departmentLoading: false,
        EmployeeSpinner: false,
        btnDisable: false
    },
    reducers: {
        closeSUccessPopUp: (state) => {
            state.signInSuccess = false;
            state.deleteSuccessfully = false;
            state.departmentSuccess = false;
            state.departmentDeleteSuccess = false;
        },
        signUperror: (state) => {
            state.createUser = ""
        },
        UserLogOut: (state) => {
            state.logInSuccess = false
            localStorage.clear()
        },
        errorTimeOut: (state) => {
            state.userLogIn = undefined
        },
        clearComapnyError: (state) => {
            state.addCopmaniError = ""
            state.departmentError = undefined
        },
        refreshTokenUpdate: (state) => {
            refreshAPI()
            state.tokenExpire = 50000
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.loading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.createUser = action.payload
                state.signInSuccess = action.payload.success
            })
            .addCase(logInUser.pending, (state) => {
                state.loading = true
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.success) {
                    state.logInSuccess = action.payload.success
                    state.tokenExpire = 50000
                    localStorage.setItem("userToken", action.payload.data.token.access)
                    localStorage.setItem("refreshToken", action.payload.data.token.refresh)
                } else {
                    state.userLogIn = action.payload.errors
                    state.logInSuccess = action.payload.success
                }
                console.log(state.logInSuccess, "++++++++++++++++++");
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                state.Users = action.payload.data.user
            })
            .addCase(getCompaniesList.pending, (state) => {
                state.loading = true
            })
            .addCase(getCompaniesList.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.success) {
                    state.companies = action.payload.data.Companies
                    state.btnDisable = false

                } else {
                    if (action.payload.status === 404) {
                        state.btnDisable = true
                        state.companies = []
                    }
                }
            })
            .addCase(addCompanies.pending, (state) => {
                state.loading = true
            })
            .addCase(addCompanies.fulfilled, (state, action) => {
                state.loading = false


                if (!action.payload.success) {
                    state.addCopmaniError = action.payload
                } else {
                    state.companies.push(action.payload.data.Company)
                    state.signInSuccess = action.payload.success
                    state.addCopmaniError = ""
                }
            })
            
            .addCase(deleteCompany.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.loading = false



                if (!action.payload.success) {
                    if (action.payload.status === 404) {
                        state.companies = []
                    }
                } else {
                    state.companies = action.payload.data.Companies
                    state.deleteSuccessfully = action.payload.success
                }
            })
           
            .addCase(updateCompnay.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCompnay.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.success) {
                    state.companies = action.payload.data.Companies
                    state.signInSuccess = action.payload.success
                    state.addCopmaniError = ""
                } else {
                    state.addCopmaniError = action.payload
                }
            })
            .addCase(getCompanydetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCompanydetails.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.success) {
                    state.company = action.payload.data.Company
                }
            })
           
            .addCase(getCompanyDepartment.pending, (state) => {
                state.loading = true
            })
            .addCase(getCompanyDepartment.fulfilled, (state, action) => {
                state.loading = false
                if (!action.payload.success) {
                    if (action.payload.status === 404) {
                        state.department = []
                        state.btnDisable = true
                    }
                } else {
                    state.btnDisable = false
                    state.department = action.payload.data.Departments
                }
            })
            .addCase(departmentAPI.pending, (state) => {
                state.loading = true
            })
            .addCase(departmentAPI.fulfilled, (state, action) => {
                state.loading = false
                console.log(action.payload);
                if (action.payload.success) {
                    state.departmentError = undefined
                    state.departmentSuccess = true
                    state.department = action.payload.data.Departments
                } else {
                    state.departmentError = action.payload.errors
                }
            })
            .addCase(updateDepartAPI.pending, (state) => {
                state.loading = true
            })
            .addCase(updateDepartAPI.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.success) {
                    state.departmentError = undefined
                    state.departmentSuccess = true
                    state.department = action.payload.data.Departments
                } else {
                    state.departmentError = action.payload.errors
                }
            })
            .addCase(deleteDepartmentAPI.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteDepartmentAPI.fulfilled, (state, action) => {
                state.loading = false
                state.departmentDeleteSuccess = true
                state.department = action.payload.data.Departments
            })
            .addCase(getAllDepartmentList.pending, (state) => {
                state.departmentLoading = true
            })
            .addCase(getAllDepartmentList.fulfilled, (state, action) => {
                state.departmentLoading = false
                if (!action.payload.success) {
                    if (action.payload.status === 404) {
                        state.btnDisable = true
                        state.department = []
                    }
                } else {
                    state.btnDisable = false
                    state.department = action.payload.data.Departments
                }
            })
            .addCase(getOneDepartment.pending, (state) => {
                state.loading = true
                state.EmployeeSpinner = true
            })
            .addCase(getOneDepartment.fulfilled, (state, action) => {
                state.EmployeeSpinner = false
                state.loading = false;
                if (action.payload.success) {
                    state.oneDepartment = action.payload.data.Department
                } else {
                    state.oneDepartment = []
                }
            })
            .addCase(departmentEmployees.pending, (state) => {
                // state.EmployeeSpinner = true
            })
            .addCase(departmentEmployees.fulfilled, (state, action) => {
                // state.EmployeeSpinner = false
                if (action.payload.success) {
                    state.employees = action.payload.data.Employees
                    state.btnDisable = false
                } else {
                    if (action.payload.status === 404) {
                        state.btnDisable = true
                        state.employees = []
                        
                    }
                }
            })
            .addCase(addDepartmentEmployees.pending, (state) => {
                state.EmployeeSpinner = true
            })
            .addCase(addDepartmentEmployees.fulfilled, (state, action) => {
                state.EmployeeSpinner = false
                if (action.payload.success) {
                    if (action.payload.data.Employees !== undefined) {

                        state.employees = action.payload.data.Employees
                    } else {
                        state.companyAllEmployees = action.payload.data.employees
                    }
                    state.departmentSuccess = action.payload.success
                    state.departmentError = undefined
                } else if (!action.payload.success) {
                    state.departmentError = action.payload.errors
                }

            })
            .addCase(deleteDepartmentEmployees.pending, (state) => {
                state.EmployeeSpinner = true
            })
            .addCase(deleteDepartmentEmployees.fulfilled, (state, action) => {
                state.EmployeeSpinner = false
                if (action.payload.success) {
                    state.departmentDeleteSuccess = true
                    if (action.payload.data.Employees !== undefined) {
                        state.employees = action.payload.data.Employees
                    } else {
                        state.companyAllEmployees = action.payload.data.employees
                    }
                }
            })
            .addCase(updateDepartmentEmployees.pending, (state) => {
                state.EmployeeSpinner = true
            })
            .addCase(updateDepartmentEmployees.fulfilled, (state, action) => {
                state.EmployeeSpinner = false
                if (action.payload.success) {
                    if (action.payload.data.Employees !== undefined) {

                        state.employees = action.payload.data.Employees
                    } else {
                        state.companyAllEmployees = action.payload.data.employees
                    }
                    state.departmentSuccess = action.payload.success
                } else if (!action.payload.success) {
                    state.departmentError = action.payload.errors
                }
            })
            .addCase(companyEmployees.pending, (state) => {
                state.EmployeeSpinner = true
            })
            .addCase(companyEmployees.fulfilled, (state, action) => {
                state.EmployeeSpinner = false
                if (action.payload.success) {
                    state.companyAllEmployees = action.payload.data.employees
                    state.btnDisable = false
                } else {
                    if (action.payload.status === 404) {
                        state.btnDisable = true
                        state.companyAllEmployees = []
                        
                    }
                }
            })
            .addCase(usersAllEmployees.pending , (state) => {
                state.EmployeeSpinner = true
            })
            .addCase(usersAllEmployees.fulfilled , (state,action) => {
                state.EmployeeSpinner = false
                if(action.payload.success) {
                    state.employees = action.payload.data.Employees
                    state.btnDisable = false
                }else {
                    if (action.payload.status === 404) {
                        state.btnDisable = true
                        state.employees = []
                        
                    }
                }
            })
        
    }
})

export const { closeSUccessPopUp, UserLogOut, errorTimeOut, signUperror, clearComapnyError, refreshTokenUpdate } = userSlice.actions
export default userSlice.reducer
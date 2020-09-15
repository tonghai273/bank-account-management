import { NzSafeAny } from 'ng-zorro-antd/core/types'

export const API_URL_STRING = 'http://localhost:4000'

export const KEY_ENCRYPT = '123456$#@$^@1ERF'

export const EMPLOYEE_DATA_TYPE = ['account_number', 'balance', 'firstname', 'lastname', 'age', 'gender', 'address', 'employer', 'email', 'city', 'state']

export const EMPLOYEE_DATA_COLUMNS = ['Account number', 'Balance', 'Firstname', 'Lastname', 'Age', 'Gender', 'Address', 'Employer', 'Email', 'City', 'State', 'Action']

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export const SESSION = {
    setSessionAuthen(value: string) {
        sessionStorage.setItem(AUTHENTICATE.AUTHEN_STRING, value)
    },
    getSessionAuthen() {
        return sessionStorage.getItem(AUTHENTICATE.AUTHEN_STRING)
    },
    removeSessionAuthen() {
        sessionStorage.removeItem(AUTHENTICATE.AUTHEN_STRING)
        sessionStorage.removeItem(AUTHENTICATE.ROLE_STRING)
    },
    setSessionRole(value: string) {
        sessionStorage.setItem(AUTHENTICATE.ROLE_STRING, value)
    },
    getSessionRole() {
        return sessionStorage.getItem(AUTHENTICATE.ROLE_STRING)
    }
}

export const AUTHENTICATE = {
    ROLE_STRING: 'role',
    AUTHEN_STRING: 'Authenticator'
}

export const ROLE = {
    ADMIN: '0',
    MEMBER: '1'
}

export const STATUS = {
    SUCCESS: 'success',
    FAILURE: 'fail',
    EXIST_ACCOUNT_NUMBER: 1000,
    EXIST_EMAIL: 1002
}

export const MESSAGE = {
    EXIST_ACCOUNT_NUMBER: 'Account number was exist!',
    EXIST_EMAIL: 'Email was exist!',
    UPDATE_SUCCESS: 'Update success!',
    SORT_ASC: 'Sort by ascend success!',
    SORT_DESC: 'Sort by descend success!',
    SORT_NUL: 'Do not sort!'
}
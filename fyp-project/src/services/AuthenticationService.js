import Api from '@/services/Api'

export default {
    register(credentials) {
        return Api().post('register', credentials)
    },
    login(credentials) {
        return Api().post('login', credentials)
    },
    forgot(credentials) {
        return Api().post('forgotPassword', credentials) 
    },
    reset(credentials) {
        return Api().post(`resetPassword`, credentials,
    ) 
}
}
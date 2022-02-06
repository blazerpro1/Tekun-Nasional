import Api from '@/services/Api'

export default {
    post(id, credentials) {
        return Api().post(`appealLoan/${id}`, credentials)
    },

    show() {
        return Api().get('/user/appeal')
    },

    showAll() {
        return Api().get('/admin/appeal')
    },

    update(credentials){
        console.log(credentials);
        return Api().put('/admin/appeal', {data: credentials})
    },

    
    
}
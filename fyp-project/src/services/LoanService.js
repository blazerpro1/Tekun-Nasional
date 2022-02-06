import Api from '@/services/Api'

export default {
    index() {
        return Api().get('loans')
    },
    post(loan) {
        return Api().post('/user/loan', loan)
    },
    userLoan() {
        return Api().get('/user/loans')
    },
    appealLoan(id) {
        return Api().get(`appealLoan/${id}`)
    },
    show() {
        return Api().get('/user/userLoans')
    },
    create(loan){
        return Api().post('/admin/loan', loan)
    },
    delete(loan){
        return Api().delete('/admin/loan', {data: loan})
    },
    //TODO
    showAll() {
        return Api().get('/admin/loans')
    },
    //TODO
    update(credentials){
        return Api().put('/admin/loan', {data: credentials})
    },


    
    
}
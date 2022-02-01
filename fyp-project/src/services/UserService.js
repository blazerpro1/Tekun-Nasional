import Api from '@/services/Api'

export default {
    index() {
        return Api().get('/user/profile') //TODO
    },
    update(credentials){
        return Api().put('/user/profile', credentials)
    }
}
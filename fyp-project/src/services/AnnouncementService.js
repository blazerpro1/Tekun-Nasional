import Api from '@/services/Api'

export default {
    index() {
        return Api().get('announcement')
    },
    post(announcement) {
        return Api().post('/admin/announcement', announcement)
    },
    delete(){
        return Api().delete('/admin/announcement')
    },
}
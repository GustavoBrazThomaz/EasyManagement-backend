const mongoose = require('mongoose')

const CustomerModel = mongoose.model('Customer', {
    name: {type: String, requried: true},
    email: {type: String, requried: true},
    price: {type: Number, requried: true},
    payment: {type: Boolean, requried: true}
})

class Customer{
    constructor(body, id){
        this.body = body
        this.error = []
        this.http_status = 0
        this.id = id
    }

    async createCustomer(){
        if(this.error.length > 0){
            this.http_status = 422
            return
        }

        this.user = await CustomerModel.create(this.body)
        this.http_status = 201
        return
    }

    static async getAllCustomers() {
        const customer = await CustomerModel.find()
        return customer
    }

    async deleteCustomer(){
        const customers = await CustomerModel.findById({ _id: this.id })

        if (!customers) {
            this.error.push({ msg: 'Cliente não encontrado' })
            return
        }
        await CustomerModel.deleteOne({ _id: this.id })
        return
    }
    
    async updateCustomer(){
        if(this.error > 0)return  
    
        const putCustomer = await CustomerModel.updateOne({ _id: this.id }, this.body)

        if (putCustomer.matchedCount === 0) {
            this.error.push({ msg: 'Usuário não encontrado' })
            return
        }
        
    }
}

module.exports = Customer
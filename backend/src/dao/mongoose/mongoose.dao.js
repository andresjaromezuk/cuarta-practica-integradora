function toPojo(object) {
    return JSON.parse(
      JSON.stringify(
        object
      )
    )
}


export class MongooseDao{

    #model

    constructor(model){
        this.#model = model
    }

    get (){
        return this.#model
    }

    async create(element){
        const item = await this.#model.create(element)
        return toPojo(item)
    }

    async readOne(criteria){
        const result = await this.#model.findOne(criteria).lean()
        return result
    }

    async readMany(criteria){
        const result = await this.#model.find(criteria).lean()
        return result
    }

    async updateOne(criteria, newData){
        const elementUpdated = await this.#model.findOneAndUpdate(criteria, newData, { new: true, projection: { _id: 0 } })
        return elementUpdated
    }

    async updateMany(criteria, newData) {
        await this.#model.updateMany(criteria, newData)
      }
    
      async deleteOne(criteria) {
        const deletedEntity = await this.#model.findOneAndDelete(criteria, { projection: { _id: 0 } }).lean()
        if (!deletedEntity) throw new Error('no encontrado')
        return deletedEntity
      }
    
      async deleteMany(criteria) {
        await this.#model.deleteMany(criteria)
      }

    //---------------PAGINATED-------------------
    async readManyPaginated(data, entity){
        const limit = parseInt(data.limit) || 10
        const page = parseInt(data.page) || 1
        const sort = parseInt(data.sort)
        const {category, status} = data
        const condition = {}
        if (category){
            const regexCategory = new RegExp(category, 'i')
            condition.category = { $regex: regexCategory }
        } else if (status){
            condition.status = status
        }

        let element
        if (sort){
            element = await this.#model.paginate(condition,{limit:limit, page: page, sort: { price: sort }})
        }else{
            element = await this.#model.paginate(condition,{limit:limit, page: page})
        }

        element.prevLink = element.hasPrevPage === false ? null : `/${entity}?limit=1&page=${element.prevPage}`
        element.nextLink = element.hasNextPage === false ? null : `/${entity}?limit=1&page=${element.nextPage}`
        return element
    }

    //---------------POPULATIONS-------------------

    async readOnePopulated(criteria, field){
        const element = await this.#model.findOne(criteria).populate(`${field}`).lean()
        return element
    }
    
    async readManyPopulated(criteria, field){
        const element = await this.#model.find(criteria).populate(`${field}`).lean()
        return element
    }
}
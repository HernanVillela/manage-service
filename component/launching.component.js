import Product from '../models/product.model.js'

const object_insert = (data) => {
    let res = {}
    for(let property of data){
        res[property.name] = property.value
    }
    return res
}

export default {
    products: async (params) => {

        try {
            let product = new Product()
            let products = await product.getProduct(params)

            let response = []
            
            for(let prod of products){
                console.info(`procesing product ${prod.url}`)

                let data = await fetch(`http://localhost:3030/scraper/product?service=${params.type}&retail_name=${prod.robot_name}&link=${prod.url}`)
                .then(response => response.json())
                .catch(e => console.log('ERROR:' + e))

                data.data.push({name: `scrapping_id`, value: prod.scrapping_id})
                data.data.push({name: `date_checked`, value: prod.date})
                response.push(data.data)

                let validate = await product.validateProduct(prod, params) // validar si es que existe en la base de datos

                console.log(validate)

                let res = object_insert(data.data)
                if(validate.length != 0){
                    console.log('actualizar el prod')
                    await product.updateProductsWeb(res, validate[0]).then(e => console.log('Se ha actualizado el producto'))
                }else{
                    console.log('insertar el prod')
                    await product.insertProductsWeb(res).then(e => console.log('Se ha insertado el producto'))
                }


            }

        } catch (error) {
            throw error
        }

    },
    categories: async (params) => {
        // configuracion para el extractor de categorias
    },
    reports: async() => {
        // configuracion para el envio de reportes
    }
}
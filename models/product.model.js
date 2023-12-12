import DB from './db.model.js'

export default class extends DB{
    getProduct = async (params) => {
        return await this.connect().then(async db => {
            let response = await db
                .select([
                    'ps.id as scrapping_id',
                    'r.id as retail_id',
                    'r.robot_name as robot_name',
                    'ps.url as url',
                    db.raw(`CURDATE() as date`)
                ])
                .from('products_scraping as ps')
                .innerJoin('retails as r', function () {
                    this.on('r.id', '=', 'ps.retail_id');
                    this.on('r.state', '=', db.raw(1));                    
                })
                .where(function () {
                    this.andWhereRaw('ps.end_date is null');
                })
                .finally(async () => {
                    await db.destroy();
                });
            return response;

        });
    }

    insertProductsWeb = async (data) => {
        return await this.connect().then(async db => {
            let response = await db
                .insert(data)
                .into(`scraping.web_products`)
                .finally(async () => {
                    await db.destroy();
                });
            console.log
            return response;

        });
    }

    updateProductsWeb = async (data, params) => {
        return await this.connect().then(async db => {
            let response = await db
                .from(`web_products`)
                .update(data)
                .where(function () {
                    this.andWhere('scrapping_id', '=', db.raw(`'${params.scrapping_id}'`));
                    this.andWhere('id', '=', db.raw(`'${params.web_product_id}'`));
                })
                .finally(async () => {
                    await db.destroy();
                });
            console.log
            return response;

        });
    }

    validateProduct = async (product, params) => {
        return await this.connect().then(async db => {
            let response = await db
                .select([
                    'wp.id as web_product_id',
                    'wp.scrapping_id as scrapping_id'
                ])
                .from('web_products as wp')
                .where(function () {
                    this.andWhere('wp.url', '=', db.raw(`'${product.url}'`));
                    this.andWhere('wp.scrapping_id', '=', db.raw(`'${product.scrapping_id}'`));
                    if(params.date){
                        this.andWhere('wp.date_checked', '=', db.raw(params.date));
                    }else{
                        this.andWhere('wp.date_checked', '=', db.raw(`CURDATE()`));
                    }
                })
                .finally(async () => {
                    await db.destroy();
                });
            return response;

        });
    }

}
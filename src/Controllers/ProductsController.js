const AppError = require("../utils/AppError");
const knex = require("../database/knex")

class ProductsController {
    async create(request, response){
        const {cod, description, un, price, ncm, cest} = request.body;
        const user_id = request.user.id

        const checkProductExist = await knex("products").where({cod});

        if (checkProductExist.length > 0){
            throw new AppError("Este código já está existe.");
        }
        if (description.length <= 0 || description.length <= 0 ){
            throw new AppError("Não é possível inserir dados vazio.", 401);
        }


       await knex ("products").insert({cod, description, un, price, ncm, cest, user_id})

        return response.status(201).json();
    }
    
    async update(request, response){
        const {cod, description, un, price, ncm, cest } = request.body;
        const { id } = request.params;
        
        const product = await knex("products").where({ id }).first();
        
        
        if (!product) {
            throw new AppError("product não encontrado");
        }


        product.cod = cod ?? product.cod;
        product.description = description ?? product.description;
        product.un = un ?? product.un;
        product.price = price ?? product.price;
        product.ncm = ncm ?? product.ncm;
        product.cest = cest ?? product.cest;

        await knex("products").where({ id }).update(product);

        return response.status(201).json()
    }
    async delete(request, response){
        const {id} = request.params

        await knex("products").where({id}).delete();

        return response.json();

    }

    async show(request, response){
        const {id} = request.params;

        const product = await knex("products").where({id}).first();

        return response.json({
            product
        });
    }
    async index(request, response) {
        try {
          const products = await knex("products").select(
            "id",
            "cod",
            "description",
            "cest",
            "price",
            "ncm",
            "un"
          );
          return response.json({ products });
        } catch (error) {
          console.error("Erro ao buscar produtos:", error.message);
          throw new AppError("Erro ao buscar produtos.", 500);
        }
      }

}

module.exports = ProductsController;
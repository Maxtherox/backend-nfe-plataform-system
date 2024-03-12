const AppError = require("../utils/AppError");
const knex = require("../database/knex")

class CompaniesController {
    async create(request, response){
        const {cnpj, cpf, auth, city, uf, address, district, cep, phone} = request.body;
        const user_id = request.user.id

        const checkCompaniesExist = await knex("companies").where({cnpj});

        if (checkCompaniesExist.length > 0){
            throw new AppError("Este código já está existe.");
        }
        if (cnpj.length <= 0 || cpf.length <= 0 ){
            throw new AppError("Não é possível inserir dados vazio.", 401);
        }


       await knex ("companies").insert({cnpj, cpf, auth, city, uf, address, district, cep, phone, user_id})

        return response.status(201).json();
    }
    
    async update(request, response){
        const {cnpj, cpf, auth, city, uf, address, district, cep, phone } = request.body;
        const { id } = request.params;
        
        const companie = await knex("companies").where({ id }).first();
        
        
        if (!companie) {
            throw new AppError("empresa não encontrada");
        }


        companie.cnpj = cnpj ?? companie.cnpj
        companie.cpf = cpf ?? companie.cpf
        companie.auth = auth ?? companie.auth
        companie.city = city ?? companie.city
        companie.uf = uf ?? companie.uf
        companie.address = address ?? companie.address
        companie.district = district ?? companie.district
        companie.cep = cep ?? companie.cep
        companie.phone = phone ?? companie.phone
        
        await knex("companies").where({ id }).update(companie);

        return response.status(201).json()
    }
    async delete(request, response){
        const {id} = request.params

        await knex("companies").where({id}).delete();

        return response.json();

    }

    async show(request, response){
        const {id} = request.params;

        const companie = await knex("companies").where({id}).first();

        return response.json({
            companie
        });
    }
    async index(request, response) {
        try {
          const companie = await knex("companies").select(
            "id",
            "cnpj",
            "cpf",
            "auth",
            "city",
            "uf",
            "address",
            "district",
            "cep",
            "phone"
          );
          return response.json({ companie });
        } catch (error) {
          console.error("Erro ao buscar produtos:", error.message);
          throw new AppError("Erro ao buscar produtos.", 500);
        }
      }

}

module.exports = CompaniesController;
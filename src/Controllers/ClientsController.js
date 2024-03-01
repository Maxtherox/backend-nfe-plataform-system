const AppError = require("../utils/AppError");
const knex = require("../database/knex")

class ClientsController {
    async create(request, response){
        const {name, email, cpf, cnpj, phone, address, cep, district, nro, city, uf, ibge  } = request.body;
        const user_id = request.user.id

        const checkUserExists = await knex("clients").where({email});

        if (checkUserExists.length > 0){
            throw new AppError("Este e-mail já está em uso.");
        }
        if (name.length <= 0 || email.length <= 0 ){
            throw new AppError("Não é possível inserir dados vazio.", 401);
        }


       await knex ("clients").insert({name, email, cpf, cnpj, phone, address, cep, district, nro, city, uf, ibge, user_id})

        return response.status(201).json();
    }
    
    async update(request, response){
        const {name, email, cpf, cnpj, phone, address, cep, district, nro, city, uf, ibge } = request.body;
        const { id } = request.params;
        
        const client = await knex("clients").where({ id }).first();
        
        
        if (!client) {
            throw new AppError("Cliente não encontrado");
        }

        const clientUpdatedEmail = await knex("clients").where({email})

        if (clientUpdatedEmail.email && clientUpdatedEmail.id !== client.id){
            throw new AppError("E-mail já em uso.")
        }

        client.name = name ?? client.name;
        client.email = email ?? client.email;
        client.cpf = cpf ?? client.cpf;
        client.cnpj = cnpj ?? client.cnpj;
        client.phone = phone ?? client.phone;
        client.address = address ?? client.address;
        client.cep = cep ?? client.cep;
        client.nro = nro ?? client.nro;
        client.district = district ?? client.district;
        client.city = city ?? client.city;
        client.uf = uf ?? client.uf;
        client.ibge = ibge ?? client.ibge;

        await knex("clients").where({ id }).update(client);

        return response.status(201).json()
    }
    async delete(request, response){
        const {id} = request.params

        await knex("clients").where({id}).delete();

        return response.json();

    }

    async show(request, response){
        const {id} = request.params;

        const client = await knex("clients").where({id}).first();

        return response.json({
            client
        });
    }

    async index(request, response) {
        try {
          const clients = await knex("clients").select(
            "id",
            "name",
            "cpf",
            "city",
            "address",
            "email",
            "phone",
            "district",
            "uf",
            "nro"
          );
          return response.json({ clients });
        } catch (error) {
          console.error("Erro ao buscar cliente:", error.message);
          throw new AppError("Erro ao buscar cliente.", 500);
        }
      }
}

module.exports = ClientsController;
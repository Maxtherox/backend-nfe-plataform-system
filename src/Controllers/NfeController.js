const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class NfeController {
    async create(request, response) {
        try {
            const {
                issuer_inscription,
                issuer_cnpj,
                issuer_auth,
                issuer_city,
                issuer_uf,
                issuer_address,
                issuer_cep,
                issuer_phone,
                danfe_operation,
                danfe_nfe_number,
                client_id,
                base_icms,
                valor_icms,
                base_tribu,
                valor_tribu,
                service_valor,
                valor_total_products,
                valor_frete,
                discount,
                other,
                valor_ipi,
                valor_approximate_taxes,
                product_id,
            } = request.body;

            
            const created_by_user_id = request.user.id;

            // Validar se o cliente existe
            const checkClientExist = await knex("clients").where({ id: client_id });

            if (checkClientExist.length === 0) {
                throw new AppError("Cliente não encontrado.", 404);
            }

                        // Validar se o produto existe
            const checkProductExist = await knex("products").where({ id: product_id });

            if (checkProductExist.length === 0) {
                throw new AppError("Produto não encontrado.", 404);
            }

            // Realizar a inserção na tabela de Nfe
            await knex("nfe").insert({
                issuer_inscription,
                issuer_cnpj,
                issuer_auth,
                issuer_city,
                issuer_uf,
                issuer_address,
                issuer_cep,
                issuer_phone,
                danfe_operation,
                danfe_nfe_number,
                client_id,
                created_by_user_id,
                base_icms,
                valor_icms,
                base_tribu,
                valor_tribu,
                service_valor,
                valor_total_products,
                valor_frete,
                discount,
                other,
                valor_ipi,
                valor_approximate_taxes,
                product_id,
            });

            return response.status(201).json({ message: 'Nota fiscal criada com sucesso.' });
        } catch (error) {
            console.error(error); // Log do erro, ajuste conforme necessário
            return response.status(error.statusCode || 500).json({ error: error.message || 'Erro interno no servidor.' });
        }
    }

    
    async update(request, response) {
        try {
            const { id } = request.params;
            const {
                issuer_inscription,
                issuer_cnpj,
                issuer_auth,
                issuer_city,
                issuer_uf,
                issuer_address,
                issuer_cep,
                issuer_phone,
                danfe_operation,
                danfe_nfe_number,
                client_id,
                base_icms,
                valor_icms,
                base_tribu,
                valor_tribu,
                service_valor,
                valor_total_products,
                valor_frete,
                discount,
                other,
                valor_ipi,
                valor_approximate_taxes,
                product_id
            } = request.body;

            const updated_by_user_id = request.user.id;

            // Validar se a nota fiscal existe
            const checkNfeExist = await knex("nfe").where({ id });

            if (checkNfeExist.length === 0) {
                throw new AppError("Nota fiscal não encontrada.", 404);
            }

            // Validar se o cliente existe
            const checkClientExist = await knex("clients").where({ id: client_id });

            if (checkClientExist.length === 0) {
                throw new AppError("Cliente não encontrado.", 404);
            }
            // Validar se o produto existe
            const checkProductExist = await knex("products").where({ id: product_id });

            if (checkProductExist.length === 0) {
                throw new AppError("Produto não encontrado.", 404);
            }

            // Realizar a atualização na tabela de Nfe
            await knex("nfe").where({ id }).update({
                issuer_inscription,
                issuer_cnpj,
                issuer_auth,
                issuer_city,
                issuer_uf,
                issuer_address,
                issuer_cep,
                issuer_phone,
                danfe_operation,
                danfe_nfe_number,
                client_id,
                updated_by_user_id,
                base_icms,
                valor_icms,
                base_tribu,
                valor_tribu,
                service_valor,
                valor_total_products,
                valor_frete,
                discount,
                other,
                valor_ipi,
                valor_approximate_taxes,
                product_id
            });

            return response.status(200).json({ message: 'Nota fiscal atualizada com sucesso.' });
        } catch (error) {
            console.error(error);
            return response.status(error.statusCode || 500).json({ error: error.message || 'Erro interno no servidor.' });
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params;

            // Validar se a nota fiscal existe
            const checkNfeExist = await knex("nfe").where({ id });

            if (checkNfeExist.length === 0) {
                throw new AppError("Nota fiscal não encontrada.", 404);
            }

            // Realizar a exclusão na tabela de Nfe
            await knex("nfe").where({ id }).del();

            return response.status(200).json({ message: 'Nota fiscal excluída com sucesso.' });
        } catch (error) {
            console.error(error);
            return response.status(error.statusCode || 500).json({ error: error.message || 'Erro interno no servidor.' });
        }
    }
        
    async show(request, response) {
        try {
            const { id } = request.params;

            const nfe = await knex("nfe")
                .select(
                    "id",
                    "issuer_inscription",
                    "issuer_cnpj",
                    "issuer_auth",
                    "issuer_city",
                    "issuer_uf",
                    "issuer_address",
                    "issuer_cep",
                    "issuer_phone",
                    "danfe_operation",
                    "danfe_nfe_number",
                    "client_id",
                    "base_icms",
                    "valor_icms",
                    "base_tribu",
                    "valor_tribu",
                    "service_valor",
                    "valor_total_products",
                    "valor_frete",
                    "discount",
                    "other",
                    "valor_ipi",
                    "valor_approximate_taxes",
                    "created_at",
                    "updated_at",
                    "product_id"
                )
                .where({ id })
                .first();

            if (!nfe) {
                throw new AppError("Nota fiscal não encontrada.", 404);
            }

            return response.json({ nfe });
        } catch (error) {
            console.error(error);
            return response.status(error.statusCode || 500).json({ error: error.message || 'Erro interno no servidor.' });
        }
    }

    async index(request, response) {
        try {
            const nfes = await knex("nfe")
                .select(
                    "id",
                    "issuer_inscription",
                    "issuer_cnpj",
                    "issuer_auth",
                    "issuer_city",
                    "issuer_uf",
                    "issuer_address",
                    "issuer_cep",
                    "issuer_phone",
                    "danfe_operation",
                    "danfe_nfe_number",
                    "client_id",
                    "base_icms",
                    "valor_icms",
                    "base_tribu",
                    "valor_tribu",
                    "service_valor",
                    "valor_total_products",
                    "valor_frete",
                    "discount",
                    "other",
                    "valor_ipi",
                    "valor_approximate_taxes",
                    "created_at",
                    "updated_at",
                    "product_id"
                );

            return response.json({ nfes });
        } catch (error) {
            console.error("Erro ao buscar notas fiscais:", error.message);
            return response.status(error.statusCode || 500).json({ error: error.message || 'Erro interno no servidor.' });
        }
    }
}

module.exports = NfeController;

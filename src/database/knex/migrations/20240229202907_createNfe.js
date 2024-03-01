exports.up = knex => knex.schema.createTable("nfe", table => {
    // Colunas obrigatórias da tabela
    table.increments("id");
    table.integer("issuer_inscription");
    table.integer("issuer_cnpj");
    table.integer("issuer_auth");
    table.string("issuer_city");
    table.string("issuer_uf");
    table.string("issuer_address");
    table.integer("issuer_cep");
    table.integer("issuer_phone");
    table.integer("danfe_operation");
    table.integer("danfe_nfe_number");

    // Coluna para armazenar o ID do usuário que criou a nota fiscal
    table.integer("created_by_user_id").references("id").inTable("users");

    // Coluna para armazenar o ID do usuário que atualizou a nota fiscal
    table.integer("updated_by_user_id").references("id").inTable("users");

    // Coluna para armazenar o ID do produto relacionado à nota fiscal
    table.integer("product_id").references("id").inTable("products");

    // Colunas relacionadas ao Destinatário (referenciando a tabela de usuários)
    table.integer("client_id").references("id").inTable("clients");

    // Colunas relacionadas ao cálculo de imposto
    table.float("base_icms");
    table.float("valor_icms");
    table.float("base_tribu");
    table.float("valor_tribu");
    table.float("service_valor");
    table.float("valor_total_products");
    table.float("valor_frete");
    table.float("discount");
    table.float("other");
    table.float("valor_ipi");
    table.float("valor_approximate_taxes");

    // Timestamps
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("nfe");

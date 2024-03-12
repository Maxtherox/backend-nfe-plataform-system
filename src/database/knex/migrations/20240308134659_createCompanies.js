exports.up = knex => knex.schema.createTable("companies", table => {
    table.increments("id");
    table.integer("cnpj");
    table.integer("cpf");
    table.text("auth");
    table.text("city");
    table.text("uf");
    table.text("address");
    table.text("district");
    table.text("cep");
    table.integer("phone");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("companies");
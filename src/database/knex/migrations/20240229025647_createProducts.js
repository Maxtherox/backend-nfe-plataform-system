exports.up = knex => knex.schema.createTable("clients", table => {
    table.increments("id");
    table.string("name", 50).notNullable();
    table.text("email").notNullable();
    table.integer("cnpj");
    table.integer("cpf");
    table.text("uf");
    table.text("cep");
    table.text("city");
    table.text("address");
    table.text("district");
    table.integer("phone");
    table.text("ibge");
    table.integer("nro");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("clients");
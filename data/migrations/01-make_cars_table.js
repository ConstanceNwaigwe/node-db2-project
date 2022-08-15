exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('vin', 128).unique().notNullable();
    tbl.text('make', 128).notNullable();
    tbl.text('model', 128).notNullable();
    tbl.decimal('mileage').notNullable();
    tbl.text('title', 128);
    tbl.text('transmission', 128);
  });
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars');
};

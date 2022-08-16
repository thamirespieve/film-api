/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex =>
  knex.schema.createTable('movie_notes', table => {
    table.increments('id')
    table.text('title')
    table.text('description')
    table.integer('rating')
    table.integer('user_id').references('id').inTable('users')

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('update_at').default(knex.fn.now())
  })

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable('movie_notes')

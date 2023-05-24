exports.seed = async function(knex) {
    await knex("tasks").del();
    await knex("tasks").insert([
        {
            title: "Example task 1",
            description: "Example task desc 1",
            startDate: new Date(),
            deadline: new Date("2023-06-01"),
        },
        {
            title: "Example task 2",
            description: "Example task 2",
            startDate: new Date(),
            deadline: new Date("2023-06-15"),
        },
    ]);
};

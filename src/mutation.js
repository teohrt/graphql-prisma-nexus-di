const Mutation = {
    async createUser(info, args, context) {
      return await context.db.mutation.createUser({
        data: {...args}
      }, info);
    }
};

module.exports = Mutation;
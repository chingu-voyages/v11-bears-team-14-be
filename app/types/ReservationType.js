const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt
} = require("graphql");

const ReservationType = new GraphQLObjectType({
    name: 'ReservationType',
    description: 'This defines the reservation/booking done by various users for a particular place',
    fields: {
        id: { type: GraphQLID },
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        start_date: { type: new GraphQLNonNull(GraphQLString) },
        end_date: { type: new GraphQLNonNull(GraphQLString) },
        total_cost: { type: new GraphQLNonNull(GraphQLInt) }
    }
});

module.exports = ReservationType;
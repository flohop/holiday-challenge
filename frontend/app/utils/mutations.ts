import {gql} from "@apollo/client";

export const ADD_SAVED_OFFERS_MUTATION = gql`
    mutation Mutation($offerId: String!) {
        toggle_saved_offer(offer_id: $offerId)
    }
`


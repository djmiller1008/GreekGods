import gql from "graphql-tag";

export default {
    DELETE_GOD: gql`
        mutation DeleteGod($id: ID) {
            deleteGod(id: $id) {
                id
            }
        }
    `,

    NEW_GOD: gql`
        mutation NewGod($name: String, $type: String, $description: String) {
            newGod(name: $name, type: $type, description: $description) {
                id,
                name,
                description 
            }
        }
    `,

    NEW_EMBLEM: gql`
        mutation NewEmblem($name: String) {
            newEmblem(name: $name) {
                id,
                name
            }
        }
        
    `,

    NEW_ABODE: gql`
        mutation NewAbode($name: String, $coordinates: String) {
            newAbode(name: $name, coordinates: $coordinates) {
                id,
                name,
                coordinates
            }
        }
    `,

    UPDATE_GOD_NAME: gql`
        mutation UpdateGodName($id: ID!, $name: String) {
            updateGod(id: $id, name: $name) {
                id,
                name
            }
        }
    `,

    UPDATE_GOD_TYPE: gql`
        mutation UpdateGodType($id: ID!, $name: String) {
            updateGod(id: $id, name: $name) {
                id,
                type
            }
        }
    `,

    UPDATE_GOD_DESCRIPTION: gql`
        mutation UpdateGodDescription($id: ID!, $description: String) {
            updateGod(id: $id, description: $description) {
                id,
                description
            }
        }
    `,

    ADD_GOD_DOMAIN: gql`
        mutation AddGodDomain($id: ID!, $domain: String) {
            addGodDomain(godId: $id, domain: $domain) {
                id,
                domains
            }
        }
    `,

    DELETE_GOD_DOMAIN: gql`
        mutation DeleteGodDomain($id: ID!, $domain: String) {
            removeGodDomain(godId: $id, domain: $domain) {
                id,
                domains
            }
        }
    `,

    UPDATE_GOD_ABODE: gql`
        mutation UpdateGodAbode($godId: ID!, $abodeId: ID!) {
            updateGodAbode(godId: $godId, abodeId: $abodeId) {
                id,
                abode {
                    name,
                    id
                }
            }
        }   
    `,

    ADD_GOD_EMBLEM: gql`
        mutation AddGodEmblem($godId: ID!, $emblemId: ID!) {
            addGodEmblem(godId: $godId, emblemId: $emblemId) {
                id,
                emblems {
                    name,
                    id
                }
            }
        }
    `,

    REMOVE_GOD_EMBLEM: gql`
        mutation RemoveGodEmblem($godId: ID!, $emblemId: ID!) {
            removeGodEmblem(godId: $godId, emblemId: $emblemId) {
                id,
                emblems {
                    name,
                    id
                }
            }
        }
    `

}

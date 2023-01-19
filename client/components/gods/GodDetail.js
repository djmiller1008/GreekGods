import React, { useState } from "react";
import { Query, renderToStringWithData } from "react-apollo";
import NameDetail from "./detail/NameDetail";
import Queries from "../../graphql/queries";
import TypeDetail from "./detail/TypeDetail";
const { FETCH_GOD } = Queries;

const GodDetail = props => {
    return (
        <Query query={FETCH_GOD} variables={{ id: props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;

                return (
                    <div className="detail">
                        <NameDetail id={data.god.id} name={data.god.name} />
                        <TypeDetail id={data.god.id} type={data.god.type} />
                    </div>
                );
            }}
        </Query>
    )
};

export default GodDetail;
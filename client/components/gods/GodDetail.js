import React from "react";
import { Query } from "react-apollo";
import NameDetail from "./detail/NameDetail";
import Queries from "../../graphql/queries";
import TypeDetail from "./detail/TypeDetail";
import DescriptionDetail from "./detail/DescriptionDetail";
import DomainDetail from "./detail/DomainDetail";
import AbodeDetail from "./detail/AbodeDetail";
import EmblemDetail from "./detail/EmblemDetail";
import RelativesDetail from "./detail/RelativesDetail";
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
                        <DescriptionDetail id={data.god.id} description={data.god.description} />
                        <DomainDetail id={data.god.id} domains={data.god.domains} />
                        <AbodeDetail id={data.god.id} abode={data.god.abode} />
                        <EmblemDetail id={data.god.id} emblems={data.god.emblems} />
                        <RelativesDetail id={data.god.id} relationship={"parent"} relatives={data.god.parents} />
                        <RelativesDetail id={data.god.id} relationship={"child"} relatives={data.god.children} />
                        <RelativesDetail id={data.god.id} relationship={"sibling"} relatives={data.god.siblings} />
                    </div>
                );
            }}
        </Query>
    )
};

export default GodDetail;
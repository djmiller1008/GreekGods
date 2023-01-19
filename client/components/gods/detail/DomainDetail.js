import React from "react";
import AddDomain from "./AddDomain";
import DeleteDomain from "./DeleteDomain";



const DomainDetail = props => {
    
    return (
        <div className="domain-detail-div">
            <h2>Domains</h2>
            <ul className="domain-list">
                {props.domains.map((domain, i) => (
                    <li key={i}>{domain}
                        <DeleteDomain id={props.id} domain={domain} />
                    </li>

                ))}
            </ul>
            <AddDomain id={props.id} />
        </div>
    )

}

export default DomainDetail;
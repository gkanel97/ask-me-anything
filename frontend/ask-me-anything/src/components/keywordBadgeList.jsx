import React from 'react';

function KeywordBadgeList(props) {
    const tags = props.tags;
    const bagdeList = tags.map((t, i) => 
        <span className="badge bg-info text-dark m-1" key={i}>{t}</span>
    );

    return (
        <React.Fragment>
            {bagdeList}
        </React.Fragment>
    );
}

export default KeywordBadgeList;
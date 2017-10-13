import React from 'react';
import PropTypes from 'prop-types'

const Iframe = (props) => {

    return (
        <iframe
            title={props.id}
            onLoad={props.onLoad}
            src={`https://meteor-first.azurewebsites.net/${props.path}`}
            height="400"
            width="350"
            sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms" />
    )
}

Iframe.protoTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.oneOf(['', 'zamestnanci', 'novyZamestnanec', 'editZamestnanec']),
    onLoad: PropTypes.func,
}

Iframe.defaultProps = {
    path: '',
    onLoad: () => { }
}

export default Iframe
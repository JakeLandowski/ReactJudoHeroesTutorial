// src/components/Medal.js

import React from 'react';

const typeMap =
{
    'G' : 'Gold',
    'S' : 'Silver',
    'B' : 'Bronze'
};


export default class Medal extends React.Component
{
    render()
    {
        const type = this.props.type;
        
        return (
            <li className="medal">
            <span className={`symbol symbol-${type}`} title={typeMap[type]}>{type} </span>
            <span className="year">{this.props.year} </span>
            <span className="city">{this.props.city} </span>
            <span className="event">({this.props.event}) </span>
            <span className="category">{this.props.category}</span>
            </li>
        );
    }
}
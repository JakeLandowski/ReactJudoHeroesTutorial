// src/components/IndexPage.js

import React from 'react';
import AthletePreview from './AtheletePreview';
import athletes from '../data/athletes';

export default class IndexPage extends React.Components
{
    render()
    {
        return
        (
            <div>
                <div>
                    {athletes.map( (athleteData) =>
                    {
                        <AthletePreview key={athleteData.id} {...athleteData} />
                    })}
                </div>
            </div>
        ):
    }
}
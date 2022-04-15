import React from 'react'
import { Route, Switch } from 'react-router'
import Pages from '../pages'

function Routes() {
    return (
        <div>
            <Switch>
                <Pages />
            </Switch>
        </div>
    )
}

export default Routes

import React, { Component } from 'react'
import { Container, Input, Menu } from 'semantic-ui-react'

export default class MenuSecondary extends Component {
    state = { activeItem: 'home' }

    //   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu >
                <Container>
                    <Menu.Item
                        name='Lookup'
                        active={activeItem === 'Lookup'}
                    //   onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Verfication'
                        active={activeItem === 'Verfication'}
                        disabled={true}
                    //   onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Scoring'
                        active={activeItem === 'Scoring'}
                        disabled={true}
                    //   onClick={this.handleItemClick}
                    />
                </Container>
            </Menu>
        )
    }
}

import React, { Component, useState } from 'react'
import { Menu, MenuItemProps, Segment, Loader, Dimmer } from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import TableExamplePagination from './Table';

const MenuExampleTabular = (props: Props) => {
  const [state, setState] = useState({ activeItem: 'Json' });

  const handleItemClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps) => void = (e, { name }) => setState({ activeItem: name || '' })


  return (
    <div>
      <Menu tabular attached={'top'}>
        <Menu.Item
          name='Json'
          active={state.activeItem === 'Json'}
          onClick={handleItemClick}
        />
       
        
      </Menu>

       <Segment attached={'bottom'}>
        {props.loader && <Dimmer active inverted>
          <Loader indeterminate />
        </Dimmer>}
        <ReactJson src={props.dataOb ? props.dataOb : {root: null}} displayDataTypes={false} collapsed={props.collapse} />
        
      </Segment>
      
    </div>

  )
}
interface Props {
  loader: boolean,
  collapse: boolean,
  dataOb: {},
}

export default MenuExampleTabular;
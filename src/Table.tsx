import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

function objForEach<T>(obj: T, f: (k: keyof T, v: T[keyof T]) => void): void {
  for (let k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      f(k, obj[k]);
    }
  }
}

const TableExamplePagination = (props: Props) => {
  const rOb = [{ account_details: [{ 'key': false}], domain_details: [{ 'key':'value'}] }];

  const getAccountDetails = () => {
    const tmp: JSX.Element[] = [];
    objForEach(props.dataOb.account_details, (k, v) => {

      if (k['registered'] !== null) {
        tmp.push(
          <Table.Cell>{`${k}: ${v['registered']}`}</Table.Cell>
        )
      }

    });
    return tmp;
  }

  const getDomainDetails = () => {
    const tmp: JSX.Element[] = [];
    objForEach(props.dataOb.domain_details, (k, v) => {


      tmp.push(
        <Table.Cell>{`${k}: ${v}`}</Table.Cell>
      )


    });
    return tmp;
  }
  return <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Social Media Accounts</Table.HeaderCell>
        <Table.HeaderCell>Domain Details</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  
    <Table.Body>

      {/* <div>
        {getAccountDetails().map((elm) => elm)}
        {getDomainDetails().map((elm) => elm)}
      </div> */}
      { }

    </Table.Body>


  </Table>;
}
interface Props {
  dataOb: {
    account_details: {},
    domain_details: {}
  }
}

export default TableExamplePagination

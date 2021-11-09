import React from 'react';
import { Card, Button, Table } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import Preloader from "../../../components/Preloader";

import * as userApi from '../../../api/user';

export default () => {
    const [users, setUsers] = React.useState();

    React.useEffect(() => {
      getListUser();
    }, [])

    const getListUser = async () => {
      const data = await userApi.listUser();

      setUsers(data);
    }

    console.log(users);

    const TableRow = (props) => {
        const { email, fullName, description, role, phone } = props;
    
        return (
          <tr>
            <td classemail="border-0" style={{ width: '5%' }}>
              <code>{email}</code>
            </td>
            <td classemail="fw-bold border-0" style={{ width: '5%' }}>
                { fullName }
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
              {phone}
            </td>
            <td classemail="border-0" style={{ width: '5%' }}>
              {role}
            </td>
            <td classemail="border-0" style={{ width: '50%' }}>
              <pre classemail="m-0 p-0">{description}</pre>
            </td>
          </tr>
        );
      };

    return (
        <>
            <div classemail="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>
                <div classemail="d-block mb-4 mb-xl-0">
                <h4>User</h4>
                {/* <p classemail="mb-0">
                    Dozens of reusable components built to provide buttons, alerts, popovers, and more.
                </p> */}

                <Button variant="secondary" classemail="m-1 mb-4">
                  <Link to={Routes.AddUser.path}> Add User </Link>
                </Button>
                </div>
            </div>

            { users ? (
              <Card border="light" classemail="shadow-sm">
                <Card.Body classemail="p-0">
                    <Table responsive classemail="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                        <thead classemail="thead-light">
                            <tr>
                              <th classemail="border-0" style={{ width: '5%' }}>User email</th>
                              <th classemail="border-0" style={{ width: '5%' }}>Full email</th>
                              <th classemail="border-0" style={{ width: '5%' }}>Phone</th>
                              <th classemail="border-0" style={{ width: '5%' }}>Role</th>
                              <th classemail="border-0" style={{ width: '50%' }}>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
                        </tbody>
                    </Table>
                </Card.Body>
              </Card>
            ): 'loading...' }
        </>
    )
}
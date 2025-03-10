import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { UserService } from './UserService';

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState(null)

  useEffect(() => {
    const userService = new UserService();
    userService.getUsers().then(data => {
      setUsers(data)
    })
  }, []);

  return (
    <DataTable
      value={users}
      selection={selectedUsers}
      onSelectionChange={(e) => setSelectedUsers(e.value)}
      dataKey="id"
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25]}
      className="datatable-responsive"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Stai visualizzando dal record {first} al record {last} di {totalRecords} utenti"
      emptyMessage="Non ci sono utenti."
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      <Column field="name" header="Name" sortable ></Column>
      <Column field="email" header="Email" sortable  ></Column>
    </DataTable>
  )
}

const Users = () => {
  let match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/create`}>
        <div> Create </div>
      </Route>
      <Route path={match.path}>
        <UsersList />
      </Route>
    </Switch>
  )
}

export default Users


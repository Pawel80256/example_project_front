import React, { useState } from 'react';
import {
    formatDate,
    EuiBasicTable,
    EuiCode,
    EuiLink,
    EuiHealth,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer,
    EuiSwitch,
    EuiHorizontalRule,
    EuiText,
    EuiFieldSearch,
    EuiButton,
    EuiButtonEmpty,
} from '@elastic/eui';
import { ClientInputModal } from './ClientInputModal';
import { stringify } from 'querystring';


export const ClientsTable = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const [enableAll, setEnableAll] = useState(false);
    const [readonly, setReadonly] = useState(false)
    const [sortField, setSortField] = useState('firstName');
    const [sortDirection, setSortDirection] = useState('asc');

    const [firstNameSearchValue, setFirstNameSearchValue] = useState('');

    const allTemporaryUsers = [
        {
            id: '1',
            firstName: 'john',
            lastName: 'doe',
            address: "JakasUlica 3/21",
        },
        {
            id: '2',
            firstName: 'Mariusz',
            lastName: 'Pudzianowski',
            address: "JakasUlica 3/21",
        },
        {
            id: '3',
            firstName: 'Adam',
            lastName: 'Małysz',
            address: "JakasUlica 3/21",
        },
        {
            id: '4',
            firstName: 'Huan',
            lastName: 'Pablo',
            address: "JakasUlica 3/21",
        },
        {
            id: '5',
            firstName: 'Cristopher',
            lastName: 'Kononowitch',
            address: "JakasUlica 3/21",
        },
    ]
    const [temporaryUsers, setTemporaryUsers] = useState(allTemporaryUsers);


    const onTableChange = ({ page = {} as any, sort = {} as any }) => {
        const { index: pageIndex, size: pageSize } = page;
        const { field: sortField, direction: sortDirection } = sort;

        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setSortField(sortField);
        setSortDirection(sortDirection);




        //sorting
        if (sortDirection === "asc") {
            setTemporaryUsers(allTemporaryUsers.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0)))
        }
        if (sortDirection === "desc") {
            setTemporaryUsers(allTemporaryUsers.sort((a, b) => (a.firstName < b.firstName) ? 1 : ((b.firstName < a.firstName) ? -1 : 0)))
        }

        //searching - setState jest ignorowane
        if (firstNameSearchValue === "") {
            console.log("siema")
            setTemporaryUsers(allTemporaryUsers)
        }
        else {
            console.log("essa")
            setTemporaryUsers(allTemporaryUsers.filter(obj => {
                return obj.firstName.includes(firstNameSearchValue)
            }))
        }

        //pagination
        if (pageSize !== 0) {
            if (pageIndex === 0) {
                setTemporaryUsers(allTemporaryUsers.slice(pageIndex, pageSize + pageIndex))
            }
            else {
                setTemporaryUsers(allTemporaryUsers.slice(pageIndex + 1, pageSize + pageIndex + 1))
            }
        }
        else setTemporaryUsers(allTemporaryUsers)



    };

    const columns = [
        {
            field: 'firstName',
            name: 'Imię',
            sortable: true,
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },
        {
            field: 'lastName',
            name: 'Nazwisko',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },

        {
            field: 'address',
            name: 'Adres',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },

        {
            field: 'editDelete',

            render: () => (
                <span>
                    <EuiFlexGroup>
                        <EuiFlexItem>
                        <ClientInputModal mode ="edit"></ClientInputModal>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiButton fill size="s" color='danger' >Usuń</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </span>
            )
        },

    ];

    const pagination = {
        pageIndex,
        pageSize,
        totalItemCount: allTemporaryUsers.length,
        pageSizeOptions: [2, 0],
        showPerPageOptions: true,
    };

    const sorting = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },
        enableAllColumns: enableAll,
        readOnly: readonly,
    };


    return (
        <div>

            <EuiFieldSearch
                incremental
                placeholder="Imie"
                isClearable={true}
                onChange={(e) => {
                    setFirstNameSearchValue(e.target.value);
                    console.log(e.target.value)
                }}
            />

            <EuiSpacer size="xl" />


            <EuiHorizontalRule margin="none" style={{ height: 2 }} />

            <EuiBasicTable
                tableCaption="Demo for EuiBasicTable with pagination"
                items={temporaryUsers}
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                onChange={onTableChange}
            />
            
        </div>
    );
};
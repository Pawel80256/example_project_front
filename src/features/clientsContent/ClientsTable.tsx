import React, { useEffect, useState } from 'react';
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
import { EuiTableSortingType } from '@elastic/eui/src/components/basic_table';
import { Client } from '../interfaces/Client';


export const ClientsTable = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const [enableAll, setEnableAll] = useState(false);
    const [readonly, setReadonly] = useState(false)
    const [sortField, setSortField] = useState<keyof Client>("firstName");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">('asc');

    const [firstNameSearchValue, setFirstNameSearchValue] = useState('');

    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const handleClose:() => void = () =>{setIsModalOpen(false)}
    
    const handleEditButton = (client:Client, mode:"add" | "edit") => {
        setClientToEdit(client);
        setModalMode(mode)
        setIsModalOpen(true);
    }

    const allTemporaryUsers = [
        {
            id: '1',
            firstName: 'john',
            lastName: 'doe',
            country: "string",
            city: "string",
            roadName: "string",
            roadNumber: "string",

        },
        {
            id: '2',
            firstName: 'Mariusz',
            lastName: 'Pudzianowski',
            country: "string",
            city: "string",
            roadName: "string",
            roadNumber: "string",

        },
        {
            id: '3',
            firstName: 'Adam',
            lastName: 'Małysz',
            country: "string",
            city: "string",
            roadName: "string",
            roadNumber: "string",

        },
        {
            id: '4',
            firstName: 'Huan',
            lastName: 'Pablo',
            country: "string",
            city: "string",
            roadName: "string",
            roadNumber: "string",

        },
        {
            id: '5',
            firstName: 'Cristopher',
            lastName: 'Kononowitch',
            country: "string",
            city: "string",
            roadName: "string",
            roadNumber: "string",

        },
    ]

    const [temporaryUsers, setTemporaryUsers] = useState<any>(allTemporaryUsers);

    useEffect(() => {
        onTableChange({page: {index: pageIndex, size: pageSize}, sort:{field: sortField, direction: sortDirection}})
    }, [firstNameSearchValue])

    const onTableChange = ({ page = {} as any, sort = {} as any }) => {
        const { index: pageIndex, size: pageSize } = page;
        const { field: sortField, direction: sortDirection } = sort;

        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setSortField(sortField);
        setSortDirection(sortDirection);
        
        let lista:Client[] = JSON.parse(JSON.stringify(allTemporaryUsers))

        //sorting
        if (sortDirection === "asc") {
            lista = (lista.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0)))
        }
        if (sortDirection === "desc") {
            lista = (lista.sort((a, b) => (a.firstName < b.firstName) ? 1 : ((b.firstName < a.firstName) ? -1 : 0)))
        }

        //searching 
        if(firstNameSearchValue !== "") {
            console.log("siema")
            lista = (lista.filter(obj => {
                return obj.firstName.includes(firstNameSearchValue)
            }))
        }

        //pagination
        if (pageSize !== 0) {
            if (pageIndex === 0) {
                lista = (lista.slice(pageIndex, pageSize + pageIndex))
            }
            else {
                lista = (lista.slice(pageIndex + 1, pageSize + pageIndex + 1))
            }
        }
     

        setTemporaryUsers(lista);

    };
    // console.log( <ClientInputModal mode ="edit" client = {client} ></ClientInputModal>)
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
            field: 'country',
            name: 'Kraj',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },

        {
            field: 'city',
            name: 'Miasto',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },
        {
            field: 'roadName',
            name: 'Ulica',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },
        {
            field: 'roadNumber',
            name: 'Numer budynku',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },

        {
            field: 'editDelete',
            name: "Edycja / Usuwanie",
            width: "25%",
            render: (client:Client) => (
                <div>
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiButton size="s" onClick={() =>{handleEditButton(client,"edit")}}>Edytuj</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiButton fill size="s" color='danger' >Usuń</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </div>
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

    const sorting:EuiTableSortingType<Client> = {
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
            <ClientInputModal mode ={modalMode} client = {clientToEdit} open={isModalOpen} handleClose={handleClose}></ClientInputModal>

        </div>
    );
};
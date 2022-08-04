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
import {Client, InitialClient} from '../interfaces/Client';
import axios from "axios";


export const ClientsTable = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const [sortField, setSortField] = useState<keyof Client>("firstName");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">('asc');

    const [allClients, setAllClients] = useState<Client[]>([]);
    const [currentClients, setCurrentClients] = useState<Client[]>([]);
    const [firstNameSearchValue, setFirstNameSearchValue] = useState('');
    const [clientToEdit, setClientToEdit] = useState<Client>(InitialClient);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const handleClose:() => void = () =>{setIsModalOpen(false)}

    const handleEditButton = (client:Client, mode:"add" | "edit") => {
        console.log(client)
        setClientToEdit(client);
        setModalMode(mode)
        setIsModalOpen(true);
    }

    const handleDelete = (clientId:string) =>{
        axios.delete('http://localhost:8080/api/client/'.concat(clientId))
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    const getClients = () =>{
        axios.get('http://localhost:8080/api/clients')
            .then((response) => {
                const clients = response.data;
                setAllClients(clients)
                setCurrentClients(clients)
            })
    }
    useEffect(getClients,[]);

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

        let lista:Client[] = JSON.parse(JSON.stringify(allClients))

        //sorting
        if (sortDirection === "asc") {
            lista = (lista.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0)))
        }
        if (sortDirection === "desc") {
            lista = (lista.sort((a, b) => (a.firstName < b.firstName) ? 1 : ((b.firstName < a.firstName) ? -1 : 0)))
        }

        //searching 
        if(firstNameSearchValue !== "") {
            lista = (lista.filter(obj => {
                return obj.firstName.includes(firstNameSearchValue)
            }))
        }

        //pagination
        if (pageSize !== 0) {
                lista = (lista.slice(pageIndex*2, pageSize+(pageIndex*2)))
        }

        setCurrentClients(lista);
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
            field: 'address.country',
            name: 'Kraj',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },

        {
            field: 'address.city',
            name: 'Miasto',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },
        {
            field: 'address.roadName',
            name: 'Ulica',
            truncateText: true,
            mobileOptions: {
                show: true,
            },
        },
        {
            field: 'address.roadNumber',
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
            render: (el:any, client:Client) => (
                <div>
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiButton size="s" onClick={() =>{handleEditButton(client,"edit")}}>Edytuj</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiButton fill size="s" color='danger' onClick={()=>handleDelete(client.id)} >Usuń</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </div>
            )
        },

    ];

    const pagination = {
        pageIndex,
        pageSize,
        totalItemCount: allClients.length,
        pageSizeOptions: [2, 0],
        showPerPageOptions: true,
    };

    const sorting:EuiTableSortingType<Client> = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },

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
                items={currentClients}
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                onChange={onTableChange}
            />
            <ClientInputModal mode ={modalMode} client = {clientToEdit} open={isModalOpen} handleClose={handleClose}></ClientInputModal>

        </div>
    );
};
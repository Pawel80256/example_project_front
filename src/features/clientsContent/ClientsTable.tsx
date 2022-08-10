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
import {useDispatch, useSelector} from "react-redux";
import {fetchClients, sliceState} from "./ClientsSlice";
import {AppDispatch, RootState} from "../../app/store";
import {deleteClient} from "./clientThunks";


export const ClientsTable:React.FC<{clients:Client[]}> = (props) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const [sortField, setSortField] = useState<keyof Client>("firstName");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">('asc');

    const dispatch = useDispatch<AppDispatch>();

    const [displayingClients, setdisplayingClients] = useState<Client[]>([]);
    const [firstNameSearchValue, setFirstNameSearchValue] = useState('');
    const [clientRequestBody, setClientRequestBody] = useState<Client>(InitialClient);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const handleClose:() => void = () =>{setIsModalOpen(false)}

    const handleEditButton = (client:Client) => {
        setClientRequestBody(client);
        setModalMode("edit")
        setIsModalOpen(true);
    }

    const handleDelete = (clientId:string) =>{
        dispatch(deleteClient(clientId))
    }

    const loadClients = () => {
        setdisplayingClients(props.clients)
    }

    useEffect(() => {
        onTableChange({page: {index: pageIndex, size: pageSize}, sort:{field: sortField, direction: sortDirection}})
    }, [firstNameSearchValue,props.clients])

    useEffect(()=>{loadClients(); },[]);


    const onTableChange = ({ page = {} as any, sort = {} as any }) => {
        const { index: pageIndex, size: pageSize } = page;
        const { field: sortField, direction: sortDirection } = sort;

        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setSortField(sortField);
        setSortDirection(sortDirection);

        let list:Client[] = JSON.parse(JSON.stringify(props.clients))
        console.log(list)

        //sorting
        if (sortDirection === "asc") {
            list = (list.sort((a, b) => a.firstName.localeCompare(b.firstName)))
        }
        if (sortDirection === "desc") {
            list = (list.sort((a, b) => a.firstName.localeCompare(b.firstName))).reverse()
        }

        //searching 
        if(firstNameSearchValue !== "") {
            list = (list.filter(obj => {
                return obj.firstName.includes(firstNameSearchValue)
            }))
        }

        //pagination
        if (pageSize !== 0) {
                list = (list.slice(pageIndex*pageSize, pageSize+(pageIndex*pageSize)))
        }

        setdisplayingClients(list);
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
                            <EuiButton size="s" onClick={() =>{handleEditButton(client)}}>Edytuj</EuiButton>
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
        totalItemCount: props.clients.length,
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
                items={displayingClients}
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                onChange={onTableChange}
            />
            <ClientInputModal mode ={modalMode} client = {clientRequestBody} open={isModalOpen} handleClose={handleClose}></ClientInputModal>

        </div>
    );
};
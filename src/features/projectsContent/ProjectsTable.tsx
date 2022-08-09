import React, {useEffect, useState} from "react";
import {Client, InitialClient} from "../interfaces/Client";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {InitialProject, Project} from "../interfaces/Project";
import {
    EuiBasicTable,
    EuiButton,
    EuiFieldSearch,
    EuiFlexGroup,
    EuiFlexItem,
    EuiHorizontalRule,
    EuiSpacer
} from "@elastic/eui";
import {EuiTableSortingType} from "@elastic/eui/src/components/basic_table";
import {ClientInputModal} from "../clientsContent/ClientInputModal";
import {deleteProject, fetchProjects} from "./ProjectThunks";
import {ProjectInputModal} from "./ProjectInputModal";

export const ProjectsTable = () =>{
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const [sortField, setSortField] = useState<keyof Project>("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">('asc');

    const dispatch = useDispatch<AppDispatch>();
    const projects = useSelector<RootState>(({ projects }) => {
        return projects.projects
    }) as Project[]


    const [currentProjects, setCurrentProjects] = useState<Project[]>([]);
    const [nameSearchValue, setNameSearchValue] = useState('');
    const [projectToEdit, setProjectToEdit] = useState<Project>(InitialProject);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const handleClose:() => void = () =>{setIsModalOpen(false)}

    const loadProjects = () =>{
        dispatch(fetchProjects())
        setCurrentProjects(projects)
    }

    const handleEditButton = (project:Project, mode:"add" | "edit") =>{
        setProjectToEdit(project)
        setModalMode(mode)
        setIsModalOpen(true)

    }

    useEffect(() => {
        loadProjects()
    },[])

    useEffect(() => {
        onTableChange({page: {index: pageIndex, size: pageSize}, sort:{field: sortField, direction: sortDirection}})
    }, [nameSearchValue,projects])


    const onTableChange = ({ page = {} as any, sort = {} as any }) => {
        const { index: pageIndex, size: pageSize } = page;
        const { field: sortField, direction: sortDirection } = sort;

        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setSortField(sortField);
        setSortDirection(sortDirection);

        let list:Project[] = JSON.parse(JSON.stringify(projects))
        console.log(list)

        //sorting
        if (sortDirection === "asc") {
            list = (list.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
        }
        if (sortDirection === "desc") {
            list = (list.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0)))
        }

        //searching
        if(nameSearchValue !== "") {
            list = (list.filter(obj => {
                return obj.name.includes(nameSearchValue)
            }))
        }

        //pagination
        if (pageSize !== 0) {
            list = (list.slice(pageIndex*2, pageSize+(pageIndex*2)))
        }

        setCurrentProjects(list);
    };

    const columns = [
        {
            field: "name",
            name: "Nazwa",
            sortable: true
        },
        {
            field: "numberOfClients",
            name: "Ilosc pacjentow",
            render:(el:any, project:Project) => (
                <div>
                    {project.clients.length}
                </div>
            )
        },
        {
            field: 'editDelete',
            name: "Edycja / Usuwanie",
            width: "25%",
            render: (el:any, project:Project) => (
                <div>
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiButton size="s" onClick={() => handleEditButton(project,"edit")}>Edytuj</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiButton fill size="s" color='danger' onClick={()=>{dispatch(deleteProject(project.id))}} >Usuń</EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </div>
            )
        },
    ];

    const pagination = {
        pageIndex,
        pageSize,
        totalItemCount: projects.length,
        pageSizeOptions: [2, 0],
        showPerPageOptions: true,
    };

    const sorting:EuiTableSortingType<Project> = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },
    };

    return (
        <div>

            <EuiFieldSearch
                incremental
                placeholder="Nazwa"
                isClearable={true}
                onChange={(e) => {
                    setNameSearchValue(e.target.value);
                    console.log(e.target.value)
                }}
            />

            <EuiSpacer size="xl" />


            <EuiHorizontalRule margin="none" style={{ height: 2 }} />

            <EuiBasicTable
                tableCaption="Demo for EuiBasicTable with pagination"
                items={currentProjects}
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                onChange={onTableChange}
            />
            <ProjectInputModal mode ={modalMode} project={projectToEdit}  open={isModalOpen} handleClose={handleClose}></ProjectInputModal>

        </div>
    );
}
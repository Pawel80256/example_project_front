import {EuiButton, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader, EuiSpacer} from "@elastic/eui"
import {ProjectsTable} from "./ProjectsTable";
import React, {useState} from "react";
import {ProjectInputModal} from "./ProjectInputModal";
import {InitialProject, Project} from "../interfaces/Project";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Client} from "../interfaces/Client";
import {ClientsTable} from "../clientsContent/ClientsTable";

export const ProjectsContent = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [displayClientsTable, setDisplayClientsTable] = useState<boolean>(false);

    const projects = useSelector<RootState>(({ projects }) => {
        return projects.projects
    }) as Project[]
    const clients = useSelector<RootState>(({ clients }) => {
        return clients.clients
    }) as Client[]

    const[isEditSelected, setIsEditSelected] = useState<boolean>(true);
    const[isClientAdditionSelected, setIsClientAdditionSelected] = useState<boolean>(false)
    return (
        <EuiPageBody panelled>
          <EuiPageHeader
            restrictWidth
            iconType="logoElastic"
            pageTitle="Projekty badawcze"
            rightSideItems={[<EuiButton onClick={()=>{setIsModalOpen(true)}}>Dodaj projekt</EuiButton>]}

            tabs={[{ label: 'Info', isSelected: isEditSelected, onClick: ()=>{setIsEditSelected(true); setIsClientAdditionSelected(false)}}
                , { label: 'Dodaj pacjentow', isSelected: isClientAdditionSelected, onClick: ()=>{setIsEditSelected(false); setIsClientAdditionSelected(true)} }]}
          />
          <EuiPageContent
            hasBorder={false}
            hasShadow={false}
            paddingSize="none"
            color="transparent"
            borderRadius="none"
          >
            <EuiPageContentBody restrictWidth>
                <ProjectsTable projects={projects}
                               displayClientAdditionButtons={isClientAdditionSelected}
                               displayEditButtons={isEditSelected}
                               setDisplayClientsTable={setDisplayClientsTable}
                />
                <ProjectInputModal mode="add" project={InitialProject} open={isModalOpen} handleClose={()=>setIsModalOpen(false)}></ProjectInputModal>
                <EuiSpacer size="xl" />

                {displayClientsTable &&
                    <>
                        <h1 style={{fontSize:"25px"}}>Dodawanie pacjentow do projektu nazwaprojektu</h1>
                        <EuiSpacer size="xl" />
                        <ClientsTable clients={clients} addingClientToProject={true}></ClientsTable>
                        <EuiButton size="m" fill color="danger" onClick={()=>{setDisplayClientsTable(false)}}>Zamknij</EuiButton>
                    </>}

            </EuiPageContentBody>

          </EuiPageContent>
        </EuiPageBody>
    )
}
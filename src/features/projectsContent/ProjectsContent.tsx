import {EuiButton, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader} from "@elastic/eui"
import {ProjectsTable} from "./ProjectsTable";
import React, {useState} from "react";
import {ProjectInputModal} from "./ProjectInputModal";
import {InitialProject, Project} from "../interfaces/Project";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Client} from "../interfaces/Client";

export const ProjectsContent = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const projects = useSelector<RootState>(({ projects }) => {
        return projects.projects
    }) as Project[]
    return (
        <EuiPageBody panelled>
          <EuiPageHeader
            restrictWidth
            iconType="logoElastic"
            pageTitle="Projekty badawcze"
            rightSideItems={[<EuiButton onClick={()=>{setIsModalOpen(true)}}>Dodaj projekt</EuiButton>]}

            tabs={[{ label: 'Info'}, { label: 'Dodaj pacjenta' }]}
          />
          <EuiPageContent
            hasBorder={false}
            hasShadow={false}
            paddingSize="none"
            color="transparent"
            borderRadius="none"
          >
            <EuiPageContentBody restrictWidth>
                <ProjectsTable projects={projects}></ProjectsTable>
                <ProjectInputModal mode="add" project={InitialProject} open={isModalOpen} handleClose={()=>setIsModalOpen(false)}></ProjectInputModal>
            </EuiPageContentBody>

          </EuiPageContent>
        </EuiPageBody>
    )
}
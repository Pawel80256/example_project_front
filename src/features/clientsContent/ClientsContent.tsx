import { EuiButton, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader } from "@elastic/eui"
import React, { useState } from "react"
import { InitialClient } from "../interfaces/Client"
import { ClientInputModal } from "./ClientInputModal"
import { ClientsTable } from "./ClientsTable"

export const ClientsContent = () =>{
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return(
        <EuiPageBody panelled>
          <EuiPageHeader
            restrictWidth
            iconType="logoElastic"
            pageTitle="Pacjenci"
            rightSideItems={[<EuiButton onClick={()=>{setIsModalOpen(true)}}>Dodaj pacjenta</EuiButton>]}

          />
          <EuiPageContent
            hasBorder={false}
            hasShadow={false}
            paddingSize="none"
            color="transparent"
            borderRadius="none"
          >
            <EuiPageContentBody restrictWidth>
              <ClientsTable></ClientsTable>
              <ClientInputModal mode="add" open={isModalOpen} client={InitialClient} handleClose={()=>setIsModalOpen(false)}></ClientInputModal>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
    )
}
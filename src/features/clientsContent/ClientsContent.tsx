import { EuiButton, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader } from "@elastic/eui"
import React from "react"
import { ClientInputModal } from "./ClientInputModal"
import { ClientsTable } from "./ClientsTable"

export const ClientsContent = () =>{
    return(
        <EuiPageBody panelled>
          <EuiPageHeader
            restrictWidth
            iconType="logoElastic"
            pageTitle="Pacjenci"
            rightSideItems={[<ClientInputModal mode="add" ></ClientInputModal>]}

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
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
    )
}
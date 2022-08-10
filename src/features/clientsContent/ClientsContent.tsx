import { EuiButton, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader } from "@elastic/eui"
import React, {useEffect, useState} from "react"
import {Client, InitialClient} from "../interfaces/Client"
import { ClientInputModal } from "./ClientInputModal"
import { ClientsTable } from "./ClientsTable"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchClients} from "./ClientsSlice";

export const ClientsContent = () =>{
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const clients = useSelector<RootState>(({ clients }) => {
        return clients.clients
    }) as Client[]

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
              <ClientsTable clients={clients}></ClientsTable>
              <ClientInputModal mode="add" open={isModalOpen} client={InitialClient} handleClose={()=>setIsModalOpen(false)}></ClientInputModal>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
    )
}
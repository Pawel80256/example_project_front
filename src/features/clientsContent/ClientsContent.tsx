import { EuiButton, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader } from "@elastic/eui"
import React, {useEffect, useState} from "react"
import {Client, InitialClient} from "../interfaces/Client"
import { ClientInputModal } from "./ClientInputModal"
import { ClientsTable } from "./ClientsTable"
import axios from "axios";

export const ClientsContent = () =>{
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [clients, setClients] = useState<Client[]>([]);
  // const getClients = () =>{
  //     axios.get('http://localhost:8080/api/clients')
  //         .then((response) => {
  //             const clients = response.data;
  //             setClients(clients)
  //         })
  // }
  // useEffect(getClients,[]);
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
import React, { useState, Fragment, useEffect } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiRange,
  EuiSwitch,
  EuiSuperSelect,
  EuiText,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { Client } from '../interfaces/Client';

export const ClientInputModal: React.FC<{ mode: "add" | "edit"; client: Client | null; open: boolean; handleClose:()=>void }> = (props) => {
  // const [open, setOpen] = useState<boolean>(false);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const closeModal = () => (props.open = false);

  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  // useffect na open ustawia clienta 
  // useEffect(() => {
  //   setCurrentClient(props.client);
  //   // setOpen(props.open)
  //   console.log(props.client)
  // }, [open])

  const form = (
    <EuiForm id={modalFormId} component="form">

      <EuiFormRow label="Imię">
        <EuiFieldText name="firstName" value={currentClient?.firstName}/>
      </EuiFormRow>
      <EuiFormRow label="Nazwisko">
        <EuiFieldText name="lastName" value={currentClient?.lastName}/>
      </EuiFormRow>
      <EuiFormRow label="Kraj">
        <EuiFieldText name="country" value={currentClient?.country}/>
      </EuiFormRow>
      <EuiFormRow label="Miasto">
        <EuiFieldText name="city" value={currentClient?.city}/>
      </EuiFormRow>
      <EuiFormRow label="Ulica">
        <EuiFieldText name="roadName" value={currentClient?.roadName}/>
      </EuiFormRow>
      <EuiFormRow label="Nr domu">
        <EuiFieldText name="roadNumber" value={currentClient?.roadNumber}/>
      </EuiFormRow>
    </EuiForm>
  );


  let modal;

  if (props.open) {
    modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            {props.mode === "add" && <h1>Dodawanie pacjenta</h1>}
            {props.mode === "edit" && <h1>Edycja danych pacjenta</h1>}
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>{form}</EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={props.handleClose}>Anuluj</EuiButtonEmpty>

          <EuiButton type="submit" form={modalFormId} onClick={props.handleClose} fill>
            Dodaj
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }
  return (
    <div>
      {/* <EuiButton size="s" onClick={()=>setOpen(true)}>
        {props.mode === "add" && "Dodaj pacjenta"}
        {props.mode === "edit" && "Edytuj "}
      </EuiButton> */}
      {modal}
    </div>
  );
};
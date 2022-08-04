import React, {useState, Fragment, useEffect, useRef} from 'react';
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
import {Client, InitialClient} from '../interfaces/Client';
import axios from "axios";

export const ClientInputModal: React.FC<{ mode: "add" | "edit"; client: Client; open: boolean; handleClose:()=>void }> = (props) => {
  // const [open, setOpen] = useState<boolean>(false);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const closeModal = () => (props.open = false);

  const [currentClient, setCurrentClient] = useState<Client>(InitialClient);

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const roadNameRef = useRef<HTMLInputElement>(null)
  const roadNumberRef = useRef<HTMLInputElement>(null)

    const addClient = () => {
        const tempClient:Client = {
            id : currentClient.id,
            firstName : firstNameRef.current!.value,
            lastName : lastNameRef.current!.value,
            address :{
                country : countryRef.current!.value,
                city : cityRef.current!.value,
                roadName : roadNameRef.current!.value,
                roadNumber : roadNumberRef.current!.value
            }
        }
        axios.post('http://localhost:8080/api/client',tempClient)
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    };


  // const [currentClient, setCurrentClient] = useState<Client | null>(null);
  // useffect na open ustawia clienta 
  // useEffect(() => {
  //   setCurrentClient(props.client);
  //   // setOpen(props.open)
  //   console.log(props.client)
  // }, [open])
    useEffect(()=>{setCurrentClient(props.client)},[props.open])
  const form = (
    <EuiForm id={modalFormId} component="form">

      <EuiFormRow label="Imię">
        <EuiFieldText name="firstName"  defaultValue={currentClient.firstName}  inputRef={firstNameRef} />
      </EuiFormRow>
      <EuiFormRow label="Nazwisko">
        <EuiFieldText name="lastName" defaultValue={currentClient.lastName} inputRef={lastNameRef}/>
      </EuiFormRow>
      <EuiFormRow label="Kraj">
        <EuiFieldText name="country" defaultValue={currentClient.address.country} inputRef={countryRef}/>
      </EuiFormRow>
      <EuiFormRow label="Miasto">
        <EuiFieldText name="city" defaultValue={currentClient.address.city} inputRef={cityRef}/>
      </EuiFormRow>
      <EuiFormRow label="Ulica">
        <EuiFieldText name="roadName" defaultValue={currentClient.address.roadName} inputRef={roadNameRef}/>
      </EuiFormRow>
      <EuiFormRow label="Nr domu">
        <EuiFieldText name="roadNumber" defaultValue={currentClient.address.roadNumber} inputRef={roadNumberRef}/>
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

          <EuiButton type="submit" form={modalFormId} onClick={addClient} fill>
            Dodaj
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }
  return (
    <div>
      {modal}
    </div>
  );
};
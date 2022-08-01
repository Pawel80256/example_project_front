import React, { useState, Fragment } from 'react';
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

export const ClientInputModal: React.FC<{mode:string}> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  
  const addFormSample = (
    <EuiForm id={modalFormId} component="form">

      <EuiFormRow label="Imię">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>
      <EuiFormRow label="Nazwisko">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>
      <EuiFormRow label="Kraj">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>
      <EuiFormRow label="Miasto">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>
      <EuiFormRow label="Ulica">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>
      <EuiFormRow label="Nr domu">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>
      <EuiFormRow label="Nr lokalu">
        <EuiFieldText name="popfirst" />
      </EuiFormRow>
    </EuiForm>
  );


  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            {props.mode === "add" && <h1>Dodawanie pacjenta</h1>}
            {props.mode === "edit" && <h1>Edycja danych pacjenta</h1>}
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>{addFormSample}</EuiModalBody>

        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Anuluj</EuiButtonEmpty>

          <EuiButton type="submit" form={modalFormId} onClick={closeModal} fill>
            Dodaj
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }
  return (
    <div>
      <EuiButton size="s" onClick={showModal}>
        {props.mode === "add" && "Dodaj pacjenta"}
        {props.mode === "edit" && "Edytuj "}
        </EuiButton>
      {modal}
    </div>
  );
};
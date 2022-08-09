import React, {useEffect, useRef, useState} from "react";
import {InitialProject, Project} from "../interfaces/Project";
import {Client} from "../interfaces/Client";
import {
    EuiButton,
    EuiButtonEmpty,
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiModal, EuiModalBody, EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    useGeneratedHtmlId
} from "@elastic/eui";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {addProject, editProject} from "./ProjectThunks";

export const ProjectInputModal: React.FC<{ mode: "add" | "edit"; project:Project ; open: boolean; handleClose:()=>void }> = (props) =>{

    const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
    const closeModal = () => (props.open = false);

    const [currentProject, setCurrentProject] = useState<Project>(InitialProject);

    const dispatch = useDispatch<AppDispatch>()

    const nameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () =>{
        const tempProject = {
            id: currentProject.id,
            name: nameRef.current!.value,
            clients: []
        }

        if(props.mode === "add"){
            dispatch(addProject(tempProject))
        }
        if(props.mode === "edit"){
            dispatch(editProject(tempProject))
        }
    }

    useEffect(()=>{setCurrentProject(props.project)},[props.open])

    const form = (
        <EuiForm id = {modalFormId} component="form">
            <EuiFormRow label = "Nazwa">
                <EuiFieldText name="name" defaultValue={currentProject.name} inputRef={nameRef}></EuiFieldText>
            </EuiFormRow>
        </EuiForm>
    );

    let modal;

    if(props.open){
        modal = (
            <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
                <EuiModalHeader>
                    <EuiModalHeaderTitle>
                        {props.mode === "add" && <h1>Dodawanie projektu</h1>}
                        {props.mode === "edit" && <h1>Edycja danych projektu</h1>}
                    </EuiModalHeaderTitle>
                </EuiModalHeader>
                <EuiModalBody>{form}</EuiModalBody>

                <EuiModalFooter>
                    <EuiButtonEmpty onClick={props.handleClose}>Anuluj</EuiButtonEmpty>

                    <EuiButton  form={modalFormId} onClick={handleSubmit} fill>
                        Dodaj
                    </EuiButton>
                </EuiModalFooter>
            </EuiModal>
        )
    }

    return(
        <div>
            {modal}
        </div>
    )
}
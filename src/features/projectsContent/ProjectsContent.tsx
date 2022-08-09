import { EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader } from "@elastic/eui"
import {ProjectsTable} from "./ProjectsTable";

export const ProjectsContent = () => {
    return (
        <EuiPageBody panelled>
          <EuiPageHeader
            restrictWidth
            iconType="logoElastic"
            pageTitle="Projekty badawcze"
            // rightSideItems={[button]}
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
                <ProjectsTable></ProjectsTable>
            </EuiPageContentBody>

          </EuiPageContent>
        </EuiPageBody>
    )
}
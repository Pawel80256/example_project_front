import { EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader } from "@elastic/eui"

export const TestResults = () => {

    return (
        <EuiPageBody panelled>
          <EuiPageHeader
            restrictWidth
            iconType="logoElastic"
            pageTitle="Wyniki"
            // rightSideItems={[button]}
            // tabs={[{ label: 'Tab 1', isSelected: true }, { label: 'Tab 2' }]}
          />
          <EuiPageContent
            hasBorder={false}
            hasShadow={false}
            paddingSize="none"
            color="transparent"
            borderRadius="none"
          >
            <EuiPageContentBody restrictWidth>{"Wyniki testów"}</EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
    )
}
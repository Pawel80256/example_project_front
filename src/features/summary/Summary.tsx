import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader } from "@elastic/eui"

export const Summary = () => {

  return (
    <EuiPageBody panelled>
      <EuiPageHeader
        restrictWidth
        iconType="logoElastic"
        pageTitle="Podsumowanie"
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
        <EuiPageContentBody restrictWidth>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiCard
                title="Ilość pacjentów"
                description="57"
              />
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiCard
                title="Ilość projektów"
                description="4"
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard              
                title="Ilość badań"
                description="25"
              />
            </EuiFlexItem>

          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  )
}
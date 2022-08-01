import { EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader, EuiPageSideBar, EuiSideNav } from '@elastic/eui';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';


import './App.css';
import { ClientsContent } from './features/clientsContent/ClientsContent';
import { ProjectsContent } from './features/projectsContent/ProjectsContent';
import { Summary } from './features/summary/Summary';
import { TestResults } from './features/testResults/testResults';

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <EuiPage paddingSize="none">
        <EuiPageSideBar paddingSize="l" sticky>
          {<EuiSideNav
            mobileTitle="Nav Items"
            // toggleOpenOnMobile={toggleOpenOnMobile}
            // isOpenOnMobile={isSideNavOpenOnMobile}
            items={[
              {
                name: 'Nawigacja',
                id: 0,
                items: [
                  {
                    name: 'Podsumowanie',
                    id: 1,
                    onClick: () => navigate("/summary")
                  },

                  {
                    name: 'Pacjenci',
                    id: 2,
                    onClick: () => navigate("/clients")
                  },
                  {
                    name: 'Projekty badawcze',
                    id: 3,
                    onClick: () => navigate("/projects")
                  },
                  {
                    name: 'Wyniki badań',
                    id: 4,
                    onClick: () => navigate("/testResults")
                  },
                ]
              }
            ]}
          />}
        </EuiPageSideBar>
        <Routes>
          <Route path="/summary" element = {<Summary/>}></Route>
          <Route path="/clients" element = {<ClientsContent/>}></Route>
          <Route path="/projects" element = {<ProjectsContent/>}></Route>
          <Route path="/testResults" element = {<TestResults/>}></Route>
        </Routes>

      </EuiPage>


    </div>
  );
}

export default App;

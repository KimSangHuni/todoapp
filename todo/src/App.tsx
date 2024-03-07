import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Home from 'pages/Home';
import ErrorBoundary from 'components/ErrorBoundary';

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Suspense fallback={<>loading...</>}>
          <Home />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}



export default App;

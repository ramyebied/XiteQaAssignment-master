import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SafeAreaView} from 'react-native';

import {MainScreen} from './src/MainScreen';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SafeAreaView>
      <MainScreen />
    </SafeAreaView>
  </QueryClientProvider>
);

export default App;

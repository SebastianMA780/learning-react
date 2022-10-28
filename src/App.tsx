import { ApiCalls, ApiCallsWithReactQuery } from './react-tips/avoid_useEffect_api_calls';
import { RenderingWatchman } from './react-tips/context_api_re_render';
import { SideEffects } from './react-tips/use_callback_optimization';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000 } },
});

function App() {

  return (
		<QueryClientProvider client={queryClient}>
    	<RenderingWatchman />
			<SideEffects />
			{/* <ApiCalls /> */}
			<ApiCallsWithReactQuery />
		</QueryClientProvider>
  );
}

export default App;

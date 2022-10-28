import { ApiCalls } from './react-tips/avoid_useEffect_api_calls';
import { RenderingWatchman } from './react-tips/context_api_re_render';
import { SideEffects } from './react-tips/use_callback_optimization';

function App() {

  return (
		<>
    	<RenderingWatchman />
			<SideEffects />
			<ApiCalls />
		</>
  );
}

export default App;

import { createStore } from 'redux';
import './index.css';
import { rootReducer } from './FreeMath';
import { render } from './DefaultHomepageActions';
import { autoSave } from './FreeMath.js';
import registerServiceWorker from './registerServiceWorker';

window.onload = function() {
    var location = window.location;
    if (location.hostname !== "localhost" && location.protocol !== 'https:')
    {
         location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
         return;
    }
    // TODO - remove use of window global var
    window.store = createStore(rootReducer);
    window.store.subscribe(render);
    window.store.subscribe(autoSave);
    render();
    window.history.replaceState(window.store.getState(), undefined, "#");
};
registerServiceWorker();

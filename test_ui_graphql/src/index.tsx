import React from 'react';
import App from 'app/App';

import 'styles/index.scss';
import {createRoot} from "react-dom/client";

const container = document.getElementById("root")
const root = createRoot(container as Element)
root.render(<App/>)

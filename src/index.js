import React from 'react';
import { createRoot } from "react-dom/client";
import { JournalApp } from './JournalApp';

import './styles/styles.scss';

const root = createRoot(document.getElementById('root'));
root.render(<JournalApp />);
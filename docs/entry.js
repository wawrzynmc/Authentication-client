
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/shared/components/FormElements/Input/Input.js';
reactComponents['Input'] = Component0;

import Component1 from '../src/shared/components/FormElements/Input/Passwords/Password/Password.js';
reactComponents['Password'] = Component1;

import Component2 from '../src/shared/components/FormElements/Input/Passwords/PasswordMeter/PasswordMeter.js';
reactComponents['PasswordMeter'] = Component2;